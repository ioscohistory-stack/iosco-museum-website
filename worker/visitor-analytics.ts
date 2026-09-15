import { siteDirectoryGroups } from "../app/site-data.ts";

interface Statement {
  bind(...values: (string | number)[]): Statement;
}
export interface VisitorDatabase {
  prepare(sql: string): Statement;
  batch(statements: Statement[]): Promise<unknown>;
}

export const visitorEndpoint = "/_museum/visit";
const productionHosts = new Set([
  "www.ioscomuseum.com", "ioscomuseum.com",
  "iosco-museum-rebuild.iosco-history.chatgpt.site",
]);
const publicPaths = new Set<string>([
  "/site-directory", ...siteDirectoryGroups.flatMap(group => group.links.map(link => link[1])),
]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const bot = /bot|spider|crawl|slurp|facebookexternalhit|headless|preview|lighthouse|curl|wget/i;

export async function recordVisitor(
  request: Request, database: VisitorDatabase | undefined, now = new Date(),
): Promise<Response> {
  const reply = (status: number) => new Response(null, {
    status, headers: { "Cache-Control": "no-store" },
  });
  const url = new URL(request.url);
  if (request.method !== "POST") return reply(405);
  if (!productionHosts.has(url.hostname) || request.headers.get("origin") !== url.origin) return reply(403);
  if (request.headers.get("sec-fetch-site") !== "same-origin") return reply(403);
  if (request.headers.get("content-type")?.split(";", 1)[0] !== "application/json") return reply(415);
  if (request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1") return reply(204);
  const agent = request.headers.get("user-agent") ?? "";
  if (!agent || bot.test(agent)) return reply(204);
  if (Number(request.headers.get("content-length") ?? 0) > 512) return reply(413);
  // Bound the body even for chunked requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply(400);
  let bytes = new Uint8Array(0);
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (bytes.length + value.length > 512) { await reader.cancel(); return reply(413); }
    const next = new Uint8Array(bytes.length + value.length);
    next.set(bytes); next.set(value, bytes.length); bytes = next;
  }
  let input: { browserId?: unknown; eventId?: unknown; path?: unknown };
  try { input = JSON.parse(new TextDecoder().decode(bytes)); }
  catch { return reply(400); }
  if (!input || typeof input.browserId !== "string" || !uuid.test(input.browserId)
    || typeof input.eventId !== "string" || !uuid.test(input.eventId)
    || typeof input.path !== "string" || !publicPaths.has(input.path)) return reply(400);
  if (!database) return reply(503);
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input.browserId));
  const browserHash = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, "0")).join("");
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Detroit", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
  const time = now.toISOString();
  const { eventId, path } = input;
  const statement = (sql: string, ...values: (string | number)[]) => database.prepare(sql).bind(...values);
  try {
    // D1 batch is atomic: all counters test the event before it is inserted.
    // A retry therefore changes no counts, including during concurrent requests.
    await database.batch([
      statement(`INSERT INTO visitor_totals (id, tracking_started_at, last_recorded_at, unique_browsers, page_views)
        SELECT 'all', ?, ?, NOT EXISTS (SELECT 1 FROM visitor_seen WHERE browser_hash = ?), 1
        WHERE NOT EXISTS (SELECT 1 FROM visitor_events WHERE event_id = ?)
        ON CONFLICT(id) DO UPDATE SET last_recorded_at = excluded.last_recorded_at,
          unique_browsers = unique_browsers + excluded.unique_browsers, page_views = page_views + 1`, time, time, browserHash, eventId),
      statement(`INSERT INTO visitor_daily (day, unique_browsers, page_views)
        SELECT ?, NOT EXISTS (SELECT 1 FROM visitor_day_seen WHERE day = ? AND browser_hash = ?), 1
        WHERE NOT EXISTS (SELECT 1 FROM visitor_events WHERE event_id = ?)
        ON CONFLICT(day) DO UPDATE SET unique_browsers = unique_browsers + excluded.unique_browsers,
          page_views = page_views + 1`, day, day, browserHash, eventId),
      statement(`INSERT INTO visitor_pages (path, page_views)
        SELECT ?, 1 WHERE NOT EXISTS (SELECT 1 FROM visitor_events WHERE event_id = ?)
        ON CONFLICT(path) DO UPDATE SET page_views = page_views + 1`, path, eventId),
      statement("INSERT INTO visitor_seen (browser_hash) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM visitor_events WHERE event_id = ?) ON CONFLICT DO NOTHING", browserHash, eventId),
      statement("INSERT INTO visitor_day_seen (day, browser_hash) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM visitor_events WHERE event_id = ?) ON CONFLICT DO NOTHING", day, browserHash, eventId),
      statement("INSERT INTO visitor_events (event_id, recorded_at) VALUES (?, ?) ON CONFLICT DO NOTHING", eventId, time),
      statement("DELETE FROM visitor_events WHERE recorded_at < ?", new Date(now.getTime() - 30 * 86400000).toISOString()),
      statement("DELETE FROM visitor_day_seen WHERE day < ?", new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Detroit", year: "numeric", month: "2-digit", day: "2-digit",
      }).format(new Date(now.getTime() - 30 * 86400000))),
    ]);
    return reply(204);
  } catch {
    // Do not log identifiers, request bodies, or personal data.
    console.error("Museum visitor recording unavailable");
    return reply(503);
  }
}
