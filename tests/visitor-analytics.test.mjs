import assert from "node:assert/strict";
import test from "node:test";
import { DatabaseSync } from "node:sqlite";
import { readFile } from "node:fs/promises";
import { recordVisitor } from "../worker/visitor-analytics.ts";

const migration = await readFile(new URL("../drizzle/0000_museum_visitor_tracking.sql", import.meta.url), "utf8");
function database() {
  const sqlite = new DatabaseSync(":memory:"); sqlite.exec(migration);
  return {
    sqlite,
    prepare(sql) { return { bind(...values) { return { sql, values }; } }; },
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        for (const { sql, values } of statements) sqlite.prepare(sql).run(...values);
        sqlite.exec("COMMIT");
      } catch (error) { sqlite.exec("ROLLBACK"); throw error; }
    },
  };
}
const firstBrowser = "11111111-1111-4111-8111-111111111111";
const secondBrowser = "22222222-2222-4222-8222-222222222222";
const event = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
function request(browserId = firstBrowser, eventId = event(1), path = "/", extra = {}) {
  return new Request("https://www.ioscomuseum.com/_museum/visit", {
    method: "POST", headers: {
      origin: "https://www.ioscomuseum.com", "sec-fetch-site": "same-origin",
      "content-type": "application/json", "user-agent": "Mozilla/5.0 Chrome/152 Safari/537.36", ...extra,
    }, body: JSON.stringify({ browserId, eventId, path }),
  });
}
test("counts new/returning browsers, page views and retries across Michigan midnight", async () => {
  const db = database();
  const before = new Date("2026-09-15T03:59:50Z"), after = new Date("2026-09-15T04:00:10Z");
  for (const [browser, id, path, now] of [
    [firstBrowser, event(1), "/", before], [firstBrowser, event(1), "/", before],
    [firstBrowser, event(2), "/visit", before], [secondBrowser, event(3), "/", before],
    [firstBrowser, event(4), "/", after],
  ]) assert.equal((await recordVisitor(request(browser, id, path), db, now)).status, 204);
  assert.deepEqual({ ...db.sqlite.prepare("SELECT unique_browsers, page_views FROM visitor_totals").get() }, { unique_browsers: 2, page_views: 4 });
  assert.deepEqual(db.sqlite.prepare("SELECT * FROM visitor_daily ORDER BY day").all().map(x => ({ ...x })), [
    { day: "2026-09-14", unique_browsers: 2, page_views: 3 },
    { day: "2026-09-15", unique_browsers: 1, page_views: 1 },
  ]);
  assert.equal(db.sqlite.prepare("SELECT page_views FROM visitor_pages WHERE path='/'").get().page_views, 3);
  const seen = db.sqlite.prepare("SELECT browser_hash FROM visitor_seen").all();
  assert.equal(seen.length, 2); assert.ok(seen.every(x => /^[a-f0-9]{64}$/.test(x.browser_hash)));
  db.sqlite.close();
});
test("ignores bots/privacy requests and rejects cross-origin, private paths and malformed input", async () => {
  const db = database();
  assert.equal((await recordVisitor(request(firstBrowser,event(1),"/",{ dnt: "1" }),db)).status,204);
  assert.equal((await recordVisitor(request(firstBrowser,event(1),"/",{ "sec-gpc": "1" }),db)).status,204);
  assert.equal((await recordVisitor(request(firstBrowser,event(1),"/",{ "user-agent": "Googlebot" }),db)).status,204);
  assert.equal((await recordVisitor(request(firstBrowser,event(1),"/",{ origin: "https://example.com" }),db)).status,403);
  assert.equal((await recordVisitor(request(firstBrowser,event(1),"/?email=private"),db)).status,400);
  assert.equal((await recordVisitor(request("bad-id"),db)).status,400);
  assert.equal((await recordVisitor(request(firstBrowser,event(1),"/".repeat(600)),db)).status,413);
  assert.equal(db.sqlite.prepare("SELECT count(*) AS n FROM visitor_totals").get().n,0);
  assert.equal((await recordVisitor(request(),undefined)).status,503);
  db.sqlite.close();
});
test("duplicate event with another browser cannot poison unique counts", async () => {
  const db = database();
  await recordVisitor(request(), db);
  await recordVisitor(request(secondBrowser), db);
  await recordVisitor(request(secondBrowser,event(2)), db);
  assert.equal(db.sqlite.prepare("SELECT unique_browsers FROM visitor_totals").get().unique_browsers,2);
  db.sqlite.close();
});
test("built production Worker routes the tracking endpoint to durable storage", async () => {
  const { default: worker } = await import("../dist/server/index.js");
  const db = database();
  const response = await worker.fetch(request(), { DB: db }, { waitUntil() {} });
  assert.equal(response.status,204);
  assert.equal(db.sqlite.prepare("SELECT page_views FROM visitor_totals").get().page_views,1);
  db.sqlite.close();
});
