/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            },
            {
                protocol: 'https',
                hostname: 'incredible-whale-22.convex.cloud',
            },
            {
                protocol: 'https',
                hostname: 'flexible-mongoose-593.convex.cloud',
            }
        ],
    },

};

module.exports = nextConfig;