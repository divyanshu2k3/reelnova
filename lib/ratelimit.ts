import { redis } from "./redis";

export async function rateLimit(identifier: string, limit: number = 5, window: string = "10s") {
    if (!redis) {
        console.warn("Redis not configured, skipping rate limit");
        return { success: true };
    }

    // Simple counter implementation or use upstash/ratelimit package
    // detailed implementation of fixed window
    const key = `ratelimit:${identifier}`;
    const count = await redis.incr(key);
    if (count === 1) {
        await redis.expire(key, 10); // 10 seconds window hardcoded for demo
    }

    if (count > limit) {
        return { success: false };
    }
    return { success: true };
}
