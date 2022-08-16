const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  images: { domains: ["photos.komoot.de"] },
  reactStrictMode: true,
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true },
  // Support MDX files as pages:
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }

    return config;
  },
});
