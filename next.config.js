/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'cdn.jsdelivr.net', 'flagicons.lipis.dev', 'www.google.com', 'i.ytimg.com'],
  },
}

module.exports = nextConfig
