import { generateSQLiteDrizzleJson, generateSQLiteMigration } from "drizzle-kit/api";
import { readFile, writeFile } from "node:fs/promises";
import * as schema from "../db/schema.ts";

const journalPath = new URL("../drizzle/meta/_journal.json", import.meta.url);
const journal = JSON.parse(await readFile(journalPath, "utf8"));
if (journal.entries.length) throw new Error("The initial visitor migration already exists; append future migrations instead.");
const previous = await generateSQLiteDrizzleJson({});
previous.id = "00000000-0000-0000-0000-000000000000";
const next = await generateSQLiteDrizzleJson(schema, previous.id);
const statements = await generateSQLiteMigration(previous, next);
const tag = "0000_museum_visitor_tracking";
await writeFile(new URL(`../drizzle/${tag}.sql`, import.meta.url), statements.join("\n--> statement-breakpoint\n") + "\n");
await writeFile(new URL("../drizzle/meta/0000_snapshot.json", import.meta.url), JSON.stringify(next, null, 2) + "\n");
journal.entries.push({ idx: 0, version: next.version, when: Date.now(), tag, breakpoints: true });
await writeFile(journalPath, JSON.stringify(journal, null, 2) + "\n");
console.log(`Generated ${statements.length} schema statements with Drizzle.`);
