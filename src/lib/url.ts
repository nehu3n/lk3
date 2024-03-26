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
