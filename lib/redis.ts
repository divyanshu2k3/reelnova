import { Redis } from "@upstash/redis";

// Create a redis client (requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in env)
// For local without env, this will fail if called, so we wrap it.

export const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null;
