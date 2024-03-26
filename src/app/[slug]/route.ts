import { API_URL } from "@/lib/db";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono();

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const response = await fetch(`${API_URL}/api/get?slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return c.redirect("/");
  }

  try {
    const data = await response.json();

    if (data.url === null) {
      return c.redirect("/");
    } else {
      return c.redirect(data.url);
    }
  } catch (error) {
    return c.redirect("/");
  }
});

export const GET = handle(app);
