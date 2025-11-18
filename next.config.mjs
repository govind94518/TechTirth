/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        mdxRs: true,
        serverActions: {
            enabled: true,
        },
    },
    serverExternalPackages: ['mongoose'], // moved out of experimental
};

export default nextConfig;
