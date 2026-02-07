import Script from "next/script";

interface AdBannerProps {
    className?: string;
}

export default function AdBanner({ className = "" }: AdBannerProps) {
    return (
        <div className={`w-full max-w-5xl mx-auto px-6 mb-12 relative ${className}`}>
            <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 glass-card rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-500 border border-white/5 z-10">
                Advertisement
            </div>
            <div className="w-full overflow-hidden flex justify-center py-6 min-h-[120px] glass-card rounded-3xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/5 via-transparent to-neon-blue/5 opacity-50 pointer-events-none" />
                <div className="relative z-10">
                    <Script id="adsterra-banner-config" strategy="afterInteractive">
                        {`
                            atOptions = {
                                'key' : '668179bf872a8c1de3720b7b81fe0fd8',
                                'format' : 'iframe',
                                'height' : 250,
                                'width' : 300,
                                'params' : {}
                            };
                        `}
                    </Script>
                    <Script
                        src="https://www.highperformanceformat.com/668179bf872a8c1de3720b7b81fe0fd8/invoke.js"
                        strategy="afterInteractive"
                    />
                </div>
            </div>
        </div>
    );
}
