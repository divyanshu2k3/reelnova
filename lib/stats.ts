import { redis } from "./redis";

export async function trackDownload() {
    if (!redis) return;

    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Increment total downloads
        await redis.incr("stats:downloads:total");

        // Increment daily downloads
        await redis.incr(`stats:downloads:${today}`);

        // Set expiry on daily key (30 days)
        await redis.expire(`stats:downloads:${today}`, 60 * 60 * 24 * 30);

    } catch (error) {
        console.error("Failed to track download stats:", error);
    }
}

export async function trackPageView(visitorId: string) {
    if (!redis) return;

    try {
        const now = Date.now();
        const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);

        // Add visitor to sorted set with timestamp as score
        await redis.zadd("stats:activeUsers", { score: now, member: visitorId });

        // Remove visitors older than 24 hours
        await redis.zremrangebyscore("stats:activeUsers", 0, twentyFourHoursAgo);

    } catch (error) {
        console.error("Failed to track page view:", error);
    }
}

export async function trackCountry(country: string) {
    if (!redis) return;

    try {
        const today = new Date().toISOString().split('T')[0];

        // Increment country counter for today
        await redis.hincrby(`stats:countries:${today}`, country || "Unknown", 1);

        // Set expiry (30 days)
        await redis.expire(`stats:countries:${today}`, 60 * 60 * 24 * 30);

    } catch (error) {
        console.error("Failed to track country:", error);
    }
}

export async function getStats() {
    const defaultData = {
        totalDownloads: 0,
        activeUsers: 0,
        serverStatus: "Unknown",
        chartData: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Downloads",
                    data: [0, 0, 0, 0, 0, 0, 0],
                    borderColor: "#00f3ff",
                    backgroundColor: "rgba(0, 243, 255, 0.2)",
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        trafficData: {
            labels: ["No Data"],
            data: [1]
        }
    };

    if (!redis) {
        return { ...defaultData, serverStatus: "No Redis" };
    }

    try {
        // Get Total Downloads
        const totalDownloads = await redis.get<number>("stats:downloads:total") || 0;

        // Get Active Users (last 24 hours)
        const activeUsers = await redis.zcard("stats:activeUsers") || 0;

        // Get last 7 days of download data
        const days = [];
        const downloads = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const count = await redis.get<number>(`stats:downloads:${dateStr}`) || 0;

            days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            downloads.push(count);
        }

        // Get traffic sources (country data from last 7 days)
        const countryMap: Record<string, number> = {};

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayCountries = await redis.hgetall(`stats:countries:${dateStr}`) || {};

            for (const [country, count] of Object.entries(dayCountries)) {
                countryMap[country] = (countryMap[country] || 0) + Number(count);
            }
        }

        // Convert to sorted array and take top 5
        const sortedCountries = Object.entries(countryMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        const trafficData = sortedCountries.length > 0
            ? {
                labels: sortedCountries.map(([country]) => country === "Unknown" ? "Unknown" : country),
                data: sortedCountries.map(([, count]) => count)
            }
            : { labels: ["No Data"], data: [1] };

        return {
            totalDownloads,
            activeUsers,
            serverStatus: "Healthy",
            chartData: {
                labels: days,
                datasets: [
                    {
                        label: "Downloads",
                        data: downloads,
                        borderColor: "#00f3ff",
                        backgroundColor: "rgba(0, 243, 255, 0.2)",
                        fill: true,
                        tension: 0.4,
                    }
                ]
            },
            trafficData
        };

    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return { ...defaultData, serverStatus: "Error" };
    }
}
