/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: [
      "images.pexels.com",
      "png.pngtree.com",
      "lh3.googleusercontent.com",
      "img.freepik.com",
      "res.cloudinary.com",
    ],
  },
  env: {
    API_URL: "",
    ENV: "dev",
    LOCAL_API_URL: "http://localhost:8080/",
  },
};
