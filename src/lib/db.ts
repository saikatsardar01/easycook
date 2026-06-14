import { createClient } from "@libsql/client/web";

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
  throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variables.");
}
const db = createClient({
  url: dbUrl,
  authToken: authToken,
});

export default db;