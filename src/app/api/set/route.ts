"use server";

import { redis } from "@/lib/db";
import { generateURLHash } from "@/lib/url";

async function createShorter(url: string) {
  const hashURL = generateURLHash(url);

  try {
    await redis.set(hashURL, url);

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      error: String(err),
    };
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") as string;

  const res = await createShorter(url);

  return Response.json(res);
}
