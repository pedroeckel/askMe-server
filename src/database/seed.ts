import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

const actualDate = new Date();

await seed(db, schema).refine((faker) => {
  return {
    rooms: {
      count: 5,
      columns: {
        createdAt: faker.date({
          maxDate: actualDate,
        }),
      },
    },
    questions: {
      count: 20,
      createdAt: faker.date({
        maxDate: actualDate,
      }),
    },
  };
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("Database seeded");
