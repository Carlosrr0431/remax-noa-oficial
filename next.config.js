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
      "images.unsplash.com",
      "source.unsplash.com",
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

    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    return config;
  },
};

module.exports = nextConfig;
