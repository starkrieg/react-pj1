/** @type {import('next').NextConfig} */
const nextConfig = {
    //basePath: "/react-pj1", // <== base path for assets for github pages
    output: "export", // <=== enables static exports
    /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
    images: {
        unoptimized: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });
        return config;
    }
};

export default nextConfig;
