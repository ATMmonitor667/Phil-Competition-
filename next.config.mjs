/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], qualities: [75] },
  async redirects() {
    // The Work section was retired; send old links to the writing.
    return [
      { source: "/work", destination: "/writing", permanent: true },
      { source: "/work/:slug*", destination: "/writing", permanent: true },
    ];
  },
};

export default nextConfig;
