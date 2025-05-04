export const BASE_API_URL = `${Deno.env.get("BASE_API_URL")}`;
export const API_KEY = `${Deno.env.get("API_KEY")}`;
export const PORT = parseInt(Deno.env.get("PORT") || "8000");
