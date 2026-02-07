"use client";

import { useState, useEffect } from "react";

export default function ThreeDElement() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-20 -right-20 w-64 h-64 md:w-[500px] md:h-[500px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-[500px] md:h-[500px] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
    );
}
