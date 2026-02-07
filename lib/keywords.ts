export const TOP_KEYWORDS = [
    "instagram reel downloader", "download instagram reels", "insta reel saver", "save instagram videos", "instagram video download",
    "ig reel downloader", "reels downloader", "instagram story saver", "download insta story", "save insta story",
    "instagram photo downloader", "insta gram video download", "instagram link downloader", "reels video download",
    "instagram reels download audio", "instagram video download mp4", "instagram downloader app", "best instagram downloader",

    // Hindi
    "instagram reels download kaise kare", "insta video kaise download kare", "instagram se video kaise download kare",
    "instagram reel save kaise kare", "best insta downloader app", "free instagram downloader",

    // Specific qualities
    "instagram reel download 4k", "instagram reel download 1080p", "high quality instagram downloader", "hd instagram video download",

    // Platform specific
    "instagram downloader for pc", "instagram downloader for android", "instagram downloader for iphone", "instagram downloader ios",

    // Long tail
    "download private instagram reels", "save instagram reels into gallery", "download instagram reels with music",
    "instagram video download online", "reels download website", "fastest instagram downloader",
    "instagram downloader no watermark", "reels download without watermark",

    // Variations
    "gram saver", "igram", "snapinsta alternative", "savefrom net instagram", "fastdl alternative",
    "reels downloader online free", "download gram videos", "insta mp4 download",

    // 300+ generated variations to reach ~1000 potential targets via combinations
];

// Helper to generate a massive list of combinations safely
export const generateKeywords = () => {
    const actions = ["download", "save", "get", "fetch", "grab"];
    const targets = ["instagram reels", "insta videos", "ig stories", "instagram photos", "reels audio", "ig content"];
    const qualities = ["hd", "4k", "1080p", "high quality", "original quality"];
    const platforms = ["online", "free", "no watermark", "fast", "instant", "for android", "for iphone"];

    const combined = [];

    // Add top keywords
    combined.push(...TOP_KEYWORDS);

    // Generate combinations
    actions.forEach(action => {
        targets.forEach(target => {
            combined.push(`${action} ${target}`);
            platforms.forEach(platform => {
                combined.push(`${action} ${target} ${platform}`);
            });
            qualities.forEach(quality => {
                combined.push(`${action} ${target} in ${quality}`);
            });
        });
    });

    return Array.from(new Set(combined)); // Remove duplicates
};

export const ALL_KEYWORDS = generateKeywords();
