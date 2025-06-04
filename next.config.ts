import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add support for external image domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },

  // Enable experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      "lucide-react",
      "@heroicons/react",
      "date-fns",
      "lodash-es",
      "@vercel/analytics",
      "@vercel/speed-insights",
      "clsx",
      "tailwind-merge",
    ],
    // Enable partial prerendering for better performance
    ppr: isDev ? false : "incremental",
    // Enable optimized CSS loading
    optimizeServerReact: true,
    // Enable serverActions for better form handling
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  // Compress responses
  compress: true,

  // Remove powered by header for security
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,

  // Page extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Environment variables to expose to the browser
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "llammao-web",
  },

  // Turbopack configuration for SVG handling
  turbopack: {
    rules: {
      // Convert SVG imports to React components
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Custom Webpack configuration (for production builds)
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  //   fileLoaderRule.exclude = /\.svg$/i

  //   return config
  // },


  // Redirects for URL management
  async redirects() {
    return [
      // Add your redirects here
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites for API proxying or URL rewriting
  async rewrites() {
    return [
      // Add your rewrites here
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ];
  },

  // TypeScript configuration
  typescript: {
    // Don't ignore build errors in production
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Don't ignore ESLint errors during builds
    ignoreDuringBuilds: false,
    dirs: ["src", "pages", "components", "lib", "utils", "hooks"],
  },

  // Output configuration for deployment
  output: "standalone",

  // Trailing slash configuration
  trailingSlash: false,

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: isDev,
    },
  },

  // Base path (useful for subdirectory deployments)
  // basePath: '/my-app',

  // Asset prefix (useful for CDN)
  // assetPrefix: isDev ? undefined : 'https://cdn.example.com',
};

export default nextConfig;
