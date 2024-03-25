import { crc32 } from "crc";
import { redis } from "./db";

export function generateURLHash(url: string): string {
  return crc32(url).toString(16);
}

export function validateURL(url: string): boolean {
  const urlRegex =
    /^(?:(?:(?:https?|ftp):)?\/\/)?(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}|(?:\d{1,3}\.){3}\d{1,3}|localhost)(?::\d+)?(?:\/[^\s]*)?$/i;
  return urlRegex.test(url);
}

export async function createShorter(url: string) {
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
      error: err,
    };
  }
}
