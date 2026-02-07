import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return new NextResponse("Missing URL", { status: 400 });
    }

    try {
        const headers: Record<string, string> = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://www.instagram.com/",
        };

        // Forward Range header if present (crucial for video seeking)
        const range = req.headers.get("range");
        if (range) {
            headers["Range"] = range;
        }

        const response = await fetch(url, { headers });

        if (!response.ok && response.status !== 206) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type") || "application/octet-stream";
        const contentRange = response.headers.get("content-range");
        const contentLength = response.headers.get("content-length");

        const resHeaders = new Headers();
        resHeaders.set("Content-Type", contentType);
        resHeaders.set("Cache-Control", "public, max-age=86400");
        if (contentRange) resHeaders.set("Content-Range", contentRange);
        if (contentLength) resHeaders.set("Content-Length", contentLength);

        return new NextResponse(response.body, {
            status: response.status,
            headers: resHeaders,
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return new NextResponse("Error fetching resource", { status: 500 });
    }
}
