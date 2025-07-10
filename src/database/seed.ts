import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

await seed(db, schema).refine((_) => {
  return {
    rooms: {
      count: 20,
    },
  };
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("Database seeded");
