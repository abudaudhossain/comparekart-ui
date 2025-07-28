import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["example.com","seller.gubuma.de",'cdn.idealo.com',"localhost","cdn.shopify.com", "cdn.shopifycdn.net", "images.unsplash.com", "www.ikea.com", "www.ikea.com.tr", "www.ikea.com.tr"],
  },
};

export default nextConfig;



