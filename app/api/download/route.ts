import { NextRequest, NextResponse } from "next/server";
import { getReelData } from "@/lib/instagram";

import { trackDownload, trackCountry } from "@/lib/stats";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url || !url.includes("instagram.com")) {
            return NextResponse.json(
                { error: "Invalid Instagram URL" },
                { status: 400 }
            );
        }

        const data = await getReelData(url);

        if (!data || data.videoUrl === "ERROR_OCCURRED") {
            return NextResponse.json(
                { error: data?.title || "Could not fetch reel data. Link might be private or API is down." },
                { status: 500 }
            );
        }

        // Track successful download
        await trackDownload();

        // Track country from request headers
        const country = req.headers.get("x-vercel-ip-country") ||
            req.headers.get("cf-ipcountry") ||
            "Unknown";
        await trackCountry(country);

        return NextResponse.json(data);

    } catch (error) {
        console.error("Download Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
