import type { NextConfig } from "next";

/** GitHub repo name — used as basePath for project Pages (username.github.io/repo/) */
const GITHUB_PAGES_REPO = "Everdrop-Mineral-Water";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${GITHUB_PAGES_REPO}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
