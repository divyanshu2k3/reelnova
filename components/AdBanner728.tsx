import Script from "next/script";

interface AdBanner728Props {
    className?: string;
}

export default function AdBanner728({ className = "" }: AdBanner728Props) {
    return (
        <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12 relative hidden md:block ${className}`}>
            <div className="absolute top-0 right-4 sm:right-6 -translate-y-1/2 px-3 py-1 glass-card rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-500 border border-white/5 z-10">
                Advertisement
            </div>
            <div className="w-full flex justify-center py-6 min-h-[100px] glass-card rounded-3xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/5 via-transparent to-neon-blue/5 opacity-50 pointer-events-none" />
                <div className="relative z-10 flex justify-center items-center">
                    <Script id="adsterra-728-config" strategy="afterInteractive">
                        {`
                            atOptions = {
                                'key' : '85457682a222323a7c5c2a6f485c9eb0',
                                'format' : 'iframe',
                                'height' : 90,
                                'width' : 728,
                                'params' : {}
                            };
                        `}
                    </Script>
                    <Script
                        src="https://www.highperformanceformat.com/85457682a222323a7c5c2a6f485c9eb0/invoke.js"
                        strategy="afterInteractive"
                    />
                </div>
            </div>
        </div>
    );
}
