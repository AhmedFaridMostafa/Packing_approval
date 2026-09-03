import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new Error("Missing the Database URL");

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: DATABASE_URL });

export const db = drizzle({ client: pool, schema });
