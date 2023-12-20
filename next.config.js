/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    images:  {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            },
            {
                protocol: "http",
                hostname: "**"
            }
        ],
        minimumCacheTTL: 1500000
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
