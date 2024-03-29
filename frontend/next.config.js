/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // This is the property you need to add
  images: {
    domains: ['https://media-cdn.tripadvisor.com','media-cdn.tripadvisor.com','res.cloudinary.com','i.imgur.com'],
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    RAPID_API_TRAVEL_API_KEY: process.env.RAPID_API_TRAVEL_API_KEY,
    ENVIRONMENT: process.env.ENVIRONMENT
  },
};

module.exports = nextConfig;
