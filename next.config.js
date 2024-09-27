/** @type {import('next').NextConfig} */
const nextConfig = {
  // es true
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "demos.creative-tim.com",
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://d0jvt1bv-3000.brs.devtunnels.ms",
        "localhost:3000",
      ],
    },
  },

  webpack(config, { isServer }) {
    const prefix = config.assetPrefix ?? config.basePath ?? "";
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${isServer ? "../" : ""}static/media/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
