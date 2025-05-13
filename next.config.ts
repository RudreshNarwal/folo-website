import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // By adding output: 'export', the next build command will generate a fully static version of your site in the out directory. This out directory is what you've (presumably) told Firebase to use as your public directory.
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
