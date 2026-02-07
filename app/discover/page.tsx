import { ALL_KEYWORDS } from "@/lib/keywords";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Discover Popular Instagram Topics - ReelNova',
    description: 'Browse popular topics and search terms for downloading Instagram Reels, Videos, and Photos with ReelNova.',
    robots: 'index, follow',
    alternates: {
        canonical: "/discover",
    },
};

export default function DiscoverPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black mb-8 text-center tracking-tighter">
                    DISCOVER <span className="text-gradient">TOPICS</span>
                </h1>

                <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                    Explore the most popular search terms and topics related to Instagram content downloading.
                    Find exactly what you need with our comprehensive directory.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {ALL_KEYWORDS.map((keyword, index) => (
                            <Link
                                key={index}
                                href="/"
                                className="text-sm text-gray-400 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-white/20"
                                aria-label={`Go to downloader for ${keyword}`}
                            >
                                {keyword}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-neon-blue text-black font-bold rounded-xl hover:bg-neon-blue/90 transition-colors">
                        Back to Downloader
                    </Link>
                </div>
            </div>
        </main>
    );
}
