/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@proteus-labs/dinohash', 'onnxruntime-node'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't attempt to load native modules on the client side
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
                crypto: false,
            };
        }

        // Handle native modules
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });

        return config;
    },
}

export default nextConfig 