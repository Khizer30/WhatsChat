const withPWA = require("next-pwa")({ dest: "public" }) ;

/** @type {import("next").NextConfig} */
const nextConfig = 
{
  typescript:
  {
    ignoreBuildErrors: true
  },
  reactStrictMode: false,
  swcMinify: true
}

module.exports = withPWA(nextConfig) ;