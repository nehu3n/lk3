import { redis } from "@/lib/db";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono();

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  let url = (await redis.get(slug)) as string;
  if (!url.startsWith("https://")) url = "https://" + url;

  if (url === null) {
    return c.redirect("/");
  }

  return c.redirect(url);
});

export const GET = handle(app);
