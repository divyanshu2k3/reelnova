"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NativeAd from "./NativeAd";

export default function DownloadForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.includes("instagram.com")) {
            setError("Please paste a valid Instagram link");
            return;
        }
        setError("");
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to download");
            }

            setResult(data);
            setLoading(false);
        } catch (err: any) {
            setError(err.message || "Failed to fetch reel. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center">
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="relative w-full"
            >
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-black/90 glass rounded-2xl p-2 border border-white/10 gap-2">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste Instagram Reel Link..."
                            className="flex-1 bg-transparent px-4 sm:px-6 py-4 text-white placeholder-gray-500 focus:outline-none text-base sm:text-lg"
                        />
                        <button
                            type="submit"
                            disabled={loading || !url}
                            className="px-6 sm:px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Download <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20"
                    >
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 w-full">
                <NativeAd />
            </div>

            {/* Result Display */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 w-full glass p-6 rounded-2xl border border-white/10"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative aspect-[9/16] w-48 rounded-lg overflow-hidden border border-white/20">
                            {/* Using video directly or thumbnail */}
                            <video
                                src={result.videoUrl}
                                controls
                                crossOrigin="anonymous"
                                className="w-full h-full object-cover"
                                poster={result.thumbnail}
                                onError={(e) => {
                                    const video = e.target as HTMLVideoElement;
                                    // If proxy fails, try direct URL as fallback (sometimes direct works if CDN is lenient)
                                    if (video.src.includes('/api/proxy')) {
                                        const params = new URLSearchParams(video.src.split('?')[1]);
                                        const originalUrl = params.get('url');
                                        if (originalUrl) {
                                            video.src = originalUrl;
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                                {result.authorAvatar && (
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={result.authorAvatar}
                                            alt={result.author}
                                            fill
                                            className="rounded-full border-2 border-neon-blue shadow-lg shadow-neon-blue/20 object-cover"
                                            unoptimized // Avatars from external IG links don't play well with Next.js optimization usually
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.author)}&background=random&color=fff`;
                                            }}
                                        />
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gradient">{result.author}</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">{result.title}</p>

                            <button
                                onClick={async (e) => {
                                    const btn = e.currentTarget;
                                    const originalContent = btn.innerHTML;
                                    try {
                                        btn.disabled = true;
                                        btn.innerHTML = 'Downloading...';

                                        const response = await fetch(result.videoUrl);
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.style.display = 'none';
                                        a.href = url;
                                        a.download = `reelnova-${Date.now()}.mp4`;
                                        document.body.appendChild(a);
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                        document.body.removeChild(a);
                                    } catch (err) {
                                        console.error("Download failed:", err);
                                        window.open(result.videoUrl, '_blank');
                                    } finally {
                                        btn.disabled = false;
                                        btn.innerHTML = originalContent;
                                    }
                                }}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-neon-blue text-black font-bold rounded-xl hover:bg-neon-blue/90 transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Save to Gallery
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
