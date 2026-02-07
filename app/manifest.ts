import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ReelNova - Instagram Downloader',
        short_name: 'ReelNova',
        description: 'Download Instagram Reels in HD instantly.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#00f3ff',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
