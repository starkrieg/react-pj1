/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/react-pj1", // <== base path for assets for github pages
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
};

export default nextConfig;
