/** @type {import('next').NextConfig} */
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
};
