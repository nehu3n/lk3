"use server";

import { redis } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") as string;

  let url = (await redis.get(slug)) as string;
  if (url == null) {
    return Response.json({
      url: "",
      error: "The URL is null.",
    });
  }

  if (!url.startsWith("https://")) url = "https://" + url;

  return Response.json({
    url: url,
    error: "",
  });
}
