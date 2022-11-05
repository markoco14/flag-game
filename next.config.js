/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'github.com', 
      'cdn.jsdelivr.net', 
      'flagicons.lipis.dev', 
      'www.google.com', 
      'i.ytimg.com',
      'hips.hearstapps.com',
      'paradepets.com',
      'cdn.akc.org',
      'www.thesprucepets.com'
    ],
  },
}

module.exports = nextConfig
