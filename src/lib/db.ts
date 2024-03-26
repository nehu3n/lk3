import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_URL || "",
  token: process.env.UPSTASH_TOKEN || "",
});

export const API_URL = "http://localhost:3000";
