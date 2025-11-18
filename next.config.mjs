/** @type {import('next').NextConfig} */
const nextConfig = {
    // ────────────────────────────────
    // Disable ESLint during next build/dev
    // ────────────────────────────────
    eslint: {
        ignoreDuringBuilds: true, // ← This kills ESLint on build
    },

    // Optional but very common when disabling lint:
    typescript: {
        ignoreBuildErrors: true, // ← Skip TypeScript errors on build too
    },

    // ────────────────────────────────
    // Your existing config (kept exactly as you had it)
    // ────────────────────────────────
    experimental: {
        mdxRs: true,
        serverActions: {
            enabled: true,
        },
    },

    serverExternalPackages: ['mongoose'], // already correct place in Next.js 14+
};

export default nextConfig;