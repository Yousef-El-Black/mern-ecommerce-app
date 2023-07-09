/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: [
      "images.pexels.com",
      "img.freepik.com",
      "cdn.shopify.com",
      "www.prada.com",
      "www.burdastyle.com",
      "images.ctfassets.net",
      "d3o2e4jr3mxnm3.cloudfront.net",
      "www.pngarts.com",
      "www.vintageindustries.nl",
      "as2.ftcdn.net",
      "palmnoosa.com.au",
    ],
  },
};
