import { Hono } from "hono";
import "jsr:@std/dotenv/load";

import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import { api } from "./routes/api/index.ts";

const app = new Hono();

// --- Middleware ---
app.use(logger());
app.use(prettyJSON()); // With options: prettyJSON({ space: 4 })
app.use(
  "/api/*",
  cors({
    origin: ["*"],
  }),
);

app.route("/api", api);

Deno.serve(app.fetch);
