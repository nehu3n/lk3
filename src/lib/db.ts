import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_URL,
  token: process.env.UPTASH_TOKEN,
});