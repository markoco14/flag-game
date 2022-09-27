/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'cdn.jsdelivr.net', 'flagicons.lipis.dev'],
  },
}

module.exports = nextConfig
