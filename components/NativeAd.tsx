"use client";

import Script from "next/script";

interface NativeAdProps {
    className?: string;
}

export default function NativeAd({ className = "" }: NativeAdProps) {
    return (
        <div className={`w-full max-w-5xl mx-auto px-6 mb-12 relative ${className}`}>
            <div className="absolute top-0 left-6 -translate-y-1/2 px-3 py-1 glass-card rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-500 border border-white/5 z-10">
                Sponsored
            </div>
            <div className="w-full overflow-hidden flex justify-center py-6 min-h-[150px] glass-card rounded-3xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-pink/5 opacity-50 pointer-events-none" />
                <Script
                    src="https://pl28654114.effectivegatecpm.com/929fbca3748158ec1add6d9a58acae86/invoke.js"
                    strategy="afterInteractive"
                    data-cfasync="false"
                    async
                />
                <div id="container-929fbca3748158ec1add6d9a58acae86" className="relative z-10"></div>
            </div>
        </div>
    );
}
