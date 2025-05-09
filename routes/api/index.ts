import { Hono } from "hono";
import { API_KEY, BASE_API_URL } from "../../config/envs.ts";

export const api = new Hono();

api.get("/", (c) => c.text("Hi from API! 👋")); // GET /book
api.get("/popular-movies", async (c) => {
  const response = await fetch(
    `${BASE_API_URL}/movie/popular?language=en-US&page=1`,
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

api.get("/upcoming-movies", async (c) => {
  const response = await fetch(
    `${BASE_API_URL}/movie/upcoming?language=en-US&page=1`,
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

api.get("/movie/:id", async (c) => {
  const movieId = c.req.param("id");

  const detailsResponse = await fetch(
    `${BASE_API_URL}/movie/${movieId}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  const videosResponse = await fetch(
    `${BASE_API_URL}/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  const creditsResponse = await fetch(
    `${BASE_API_URL}/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  const [videos, credits] = await Promise.all([
    videosResponse.json(), // This returns a promise
    creditsResponse.json(), // This returns a promise
  ]);

  const movieData = await detailsResponse.json();

  const movieDetails = {
    ...movieData,
    credits,
    videos,
  };

  return c.json(movieDetails);
});
