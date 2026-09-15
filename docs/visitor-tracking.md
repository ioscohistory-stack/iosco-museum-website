# Museum website visitor statistics

Tracking was added on September 14, 2026. The live `visitor_totals.tracking_started_at`
value is the first recorded event, in UTC. Historical server-log samples are separate
evidence and must never be added to these counters or described as unique people.

The museum's Sites D1 database (`DB`) stores these private reports:

- `visitor_totals`: unique anonymous browsers and page views since tracking started.
- `visitor_daily`: unique browsers and page views for each Michigan calendar day.
- `visitor_pages`: page views by known public page path.

Use the Sites database overview and table-reading tools to retrieve reports. There
is no public statistics endpoint. Counts persist across deployments. To count a
range of days, sum daily page views, but never sum daily unique browsers and label
that result as distinct people across the range.

Each browser uses a random first-party local identifier; only its SHA-256 hash is
stored on the server. Browser hashes are not linked to individual page histories.
No names, email addresses, IP addresses, query strings, full referrers, location,
or payment details are stored by this tracker. The museum's hosting provider may
retain its own operational request logs separately.

Known crawler user agents, browser automation, hidden prerendered pages, local
previews, unknown page paths, Do Not Track, and Global Privacy Control are excluded.
Only visible browser navigations count; automatic asset downloads and link
prefetches do not count. A retry uses the same event identifier and is counted once.
Event deduplication and daily browser membership records expire after 30 days;
aggregate reports and anonymous lifetime browser hashes are retained.

Unique browsers are an estimate of visitors, not an exact number of people.
Different devices, browser profiles, domain variants, or cleared browser storage
can count the same person again. Blocked storage/scripts, privacy preferences,
very short visits, and network failures can lead to undercounting. Bots that
impersonate real browsers may still be counted. No pre-tracking total is inferred.

Verification traffic should be labeled separately when reporting the initial
counts. Automated local tests use an isolated database and never change live totals.
