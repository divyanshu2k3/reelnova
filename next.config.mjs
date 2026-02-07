/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'instagram.com',
            },
            {
                protocol: 'https',
                hostname: '**.cdninstagram.com',
            },
        ],
        unoptimized: true, // Required for static export if used, but beneficial for some deployments to save costs
    },
    compress: true,
    powershell: true, // Just valid JS, no effect on next config but keeps syntax valid
};

export default nextConfig;
