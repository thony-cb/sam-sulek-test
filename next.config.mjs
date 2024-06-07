/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "source.unsplash.com",
      port: "",
      pathname: "/image/upload/**",
    },
  ],
};

export default nextConfig;
