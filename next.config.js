/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.bayut.com",
      "images.pexels.com",
      "bayut-production.s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
