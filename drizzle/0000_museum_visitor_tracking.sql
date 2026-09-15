CREATE TABLE `visitor_daily` (
	`day` text PRIMARY KEY NOT NULL,
	`unique_browsers` integer DEFAULT 0 NOT NULL,
	`page_views` integer DEFAULT 0 NOT NULL
);

--> statement-breakpoint
CREATE TABLE `visitor_day_seen` (
	`day` text NOT NULL,
	`browser_hash` text NOT NULL,
	PRIMARY KEY(`day`, `browser_hash`)
);

--> statement-breakpoint
CREATE TABLE `visitor_events` (
	`event_id` text PRIMARY KEY NOT NULL,
	`recorded_at` text NOT NULL
);

--> statement-breakpoint
CREATE INDEX `idx_visitor_events_recorded_at` ON `visitor_events` (`recorded_at`);
--> statement-breakpoint
CREATE TABLE `visitor_pages` (
	`path` text PRIMARY KEY NOT NULL,
	`page_views` integer DEFAULT 0 NOT NULL
);

--> statement-breakpoint
CREATE TABLE `visitor_seen` (
	`browser_hash` text PRIMARY KEY NOT NULL
);

--> statement-breakpoint
CREATE TABLE `visitor_totals` (
	`id` text PRIMARY KEY NOT NULL,
	`tracking_started_at` text NOT NULL,
	`last_recorded_at` text NOT NULL,
	`unique_browsers` integer DEFAULT 0 NOT NULL,
	`page_views` integer DEFAULT 0 NOT NULL
);

