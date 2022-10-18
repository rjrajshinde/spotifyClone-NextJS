/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "links.papareact.com",
      "www.cityalight.com",
    ],
  },
};

module.exports = nextConfig;
