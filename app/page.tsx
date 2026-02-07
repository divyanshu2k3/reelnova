import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
    title: "Instagram Reel Downloader - Fast, Free & HD | ReelNova.in",
    description: "Best Instagram Reel Downloader for 2025. Save IG reels in HD 4K, no watermark. Free, fast and easy tool to download instagram videos, reels and photos instantly.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    return <HomeContent />;
}
