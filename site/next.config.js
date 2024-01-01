
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    poweredByHeader: false,
    experimental: {
        typedRoutes: true
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
}

module.exports = (phase, { defaultConfig }) => {
    return withBundleAnalyzer(nextConfig)
}
