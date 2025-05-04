import { Hono } from "hono";
import { API_KEY, BASE_API_URL } from "../../config/envs.ts";

export const api = new Hono();

api.get("/", (c) => c.text("Hi from API! 👋")); // GET /book
api.get("/movies", async (c) => {
  const response = await fetch(
    `${BASE_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  const data = await response.json();

  return c.json(data);
});
