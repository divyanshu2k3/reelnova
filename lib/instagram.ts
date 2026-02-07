import axios from "axios";

export interface ReelData {
    title: string;
    thumbnail: string;
    videoUrl: string;
    author: string;
    authorAvatar: string;
    version?: string;
    error?: string;
}

/**
 * UNIVERSAL INSTAGRAM FETCHER (V14)
 * Hardened logic for all devices and link types (Reels, Posts, IGTV).
 */
export async function getReelData(url: string): Promise<ReelData | null> {
    // Hardcoded key as per user's "undo" request to maintain stability
    const apiKey = process.env.RAPIDAPI_KEY || 'f3b88ec52amsh56ba92c2310c31ep11c7fbjsn5be8006fc803';

    if (!apiKey) {
        console.error("❌ API Key Missing");
        return {
            title: "System Error: API Configuration Missing",
            thumbnail: "",
            videoUrl: "ERROR_OCCURRED",
            author: "Admin",
            authorAvatar: "",
            error: "MISSING_KEY"
        };
    }

    // --- UNIVERSAL URL NORMALIZATION ---
    let cleanUrl = url.trim().split("?")[0];

    // Convert mobile short-links
    if (cleanUrl.includes("instagr.am")) {
        cleanUrl = cleanUrl.replace("instagr.am", "instagram.com");
    }

    // Unify all paths to /reel/ (Best compatibility for downloaders)
    if (cleanUrl.includes("/reels/")) cleanUrl = cleanUrl.replace("/reels/", "/reel/");
    if (cleanUrl.includes("/reels/share/")) cleanUrl = cleanUrl.replace("/reels/share/", "/reel/");
    if (cleanUrl.includes("/p/")) cleanUrl = cleanUrl.replace("/p/", "/reel/");
    if (cleanUrl.includes("/tv/")) cleanUrl = cleanUrl.replace("/tv/", "/reel/");

    // Remove trailing slash
    while (cleanUrl.endsWith("/")) {
        cleanUrl = cleanUrl.slice(0, -1);
    }

    // Standardize Domain
    if (!cleanUrl.startsWith("http")) {
        cleanUrl = "https://" + cleanUrl;
    }
    if (cleanUrl.includes("instagram.com") && !cleanUrl.includes("www.")) {
        cleanUrl = cleanUrl.replace("instagram.com", "www.instagram.com");
    }

    console.log("🚀 UNIVERSAL URL:", cleanUrl);

    const providers = [
        {
            host: "social-media-video-downloader.p.rapidapi.com",
            api: "https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram",
            params: { url: cleanUrl }
        },
        {
            host: "instagram-reels-downloader-api.p.rapidapi.com",
            api: "https://instagram-reels-downloader-api.p.rapidapi.com/download",
            params: { url: cleanUrl }
        },
        {
            host: "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com",
            api: "https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index",
            params: { url: cleanUrl }
        },
        {
            host: "instagram-downloader7.p.rapidapi.com",
            api: "https://instagram-downloader7.p.rapidapi.com/index",
            params: { url: cleanUrl }
        }
    ];

    for (const provider of providers) {
        try {
            console.log(`� Fetching from: ${provider.host}`);

            const res = await axios.get(provider.api, {
                params: provider.params,
                headers: {
                    "x-rapidapi-key": apiKey,
                    "x-rapidapi-host": provider.host,
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
                },
                timeout: 12000
            });

            const vid =
                res.data?.data?.medias?.[0]?.url ||
                res.data?.medias?.[0]?.url ||
                res.data?.data?.url ||
                res.data?.url ||
                res.data?.result?.url ||
                res.data?.download?.url ||
                res.data?.video_url ||
                res.data?.links?.[0]?.link ||
                res.data?.media;

            if (vid) {
                // Determine best video URL - some providers give multiple qualities
                const videoUrl = vid;

                // Better Author Data Extraction
                const authorData = res.data?.data?.owner || res.data?.author || res.data?.owner || {};
                const authorUsername = authorData?.username || res.data?.data?.username || res.data?.username || "@instagram";

                // Enhanced Profile Picture Extraction
                const profilePic =
                    authorData?.profile_pic_url ||
                    authorData?.avatar_url ||
                    res.data?.data?.user?.profile_pic_url ||
                    res.data?.user?.profile_pic_url ||
                    res.data?.data?.picture ||
                    res.data?.picture ||
                    "https://github.com/shadcn.png";

                return {
                    title: res.data?.data?.title || res.data?.title || "Instagram Video",
                    thumbnail: res.data?.data?.thumbnail || res.data?.thumbnail || res.data?.picture || res.data?.cover_url || "",
                    videoUrl: `/api/proxy?url=${encodeURIComponent(videoUrl)}`, // Proxy video to bypass CDN blocks
                    author: authorUsername,
                    authorAvatar: `/api/proxy?url=${encodeURIComponent(profilePic)}`,
                    version: provider.host.split('.')[0] // For debugging
                };
            }
        } catch (err: any) {
            console.warn(`⚠️ Provider ${provider.host} failed`);
            continue;
        }
    }

    return {
        title: "Could not fetch content. Video might be private or temporary API issue.",
        thumbnail: "",
        videoUrl: "ERROR_OCCURRED",
        author: "System",
        authorAvatar: "",
        error: "ALL_FAILED"
    };
}
