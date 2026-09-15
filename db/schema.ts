import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visitorTotals = sqliteTable("visitor_totals", {
  id: text("id").primaryKey(),
  trackingStartedAt: text("tracking_started_at").notNull(),
  lastRecordedAt: text("last_recorded_at").notNull(),
  uniqueBrowsers: integer("unique_browsers").notNull().default(0),
  pageViews: integer("page_views").notNull().default(0),
});

export const visitorDaily = sqliteTable("visitor_daily", {
  day: text("day").primaryKey(),
  uniqueBrowsers: integer("unique_browsers").notNull().default(0),
  pageViews: integer("page_views").notNull().default(0),
});

export const visitorPages = sqliteTable("visitor_pages", {
  path: text("path").primaryKey(),
  pageViews: integer("page_views").notNull().default(0),
});

export const visitorSeen = sqliteTable("visitor_seen", {
  browserHash: text("browser_hash").primaryKey(),
});

export const visitorDaySeen = sqliteTable("visitor_day_seen", {
  day: text("day").notNull(),
  browserHash: text("browser_hash").notNull(),
}, (table) => [primaryKey({ columns: [table.day, table.browserHash] })]);

// Retry deduplication only; these records contain no browser IDs or page paths.
export const visitorEvents = sqliteTable("visitor_events", {
  eventId: text("event_id").primaryKey(),
  recordedAt: text("recorded_at").notNull(),
}, (table) => [index("idx_visitor_events_recorded_at").on(table.recordedAt)]);
