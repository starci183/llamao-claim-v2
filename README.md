# llammao-web

A modern Next.js application with optimized configuration and best practices.

## Features

### Performance Optimizations

- ✅ **Turbopack** for faster development builds
- ✅ **SWC Minification** for better production performance
- ✅ **Partial Prerendering (PPR)** for incremental static generation
- ✅ **Optimized Package Imports** for popular libraries
- ✅ **Bundle Splitting** with vendor chunks
- ✅ **Image Optimization** with WebP/AVIF support

### Developer Experience

- ✅ **TypeScript** with strict configuration
- ✅ **ESLint** with Next.js recommended rules
- ✅ **Tailwind CSS v4** for styling
- ✅ **Path Aliases** for cleaner imports (`@/components`, `@/lib`, etc.)
- ✅ **SVG as React Components** with SVGR
- ✅ **Bundle Analyzer** support

### Security & SEO

- ✅ **Security Headers** (CSP, HSTS, X-Frame-Options, etc.)
- ✅ **Proper Caching** for static assets
- ✅ **Environment Variables** management
- ✅ **No Powered-By Header** for security

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd llammao-web

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env.local

# Start development server
yarn dev
```

## Available Scripts

```bash
# Development
yarn dev                 # Start development server with Turbopack
yarn type-check         # Run TypeScript type checking
yarn lint               # Run ESLint
yarn lint:fix           # Fix ESLint errors

# Production
yarn build              # Build for production
yarn start              # Start production server
yarn preview            # Build and start production server

# Analysis
yarn build:analyze      # Build with bundle analyzer
yarn clean              # Clean build files
```

## Project Structure

```
src/
├── app/                # Next.js App Router
├── components/         # Reusable components
├── lib/               # Utility libraries
├── utils/             # Helper functions
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## Configuration Highlights

### Next.js Config Features

- **Image Optimization**: WebP/AVIF formats, responsive sizes, external domains
- **Experimental Features**: Turbopack, PPR, optimized package imports
- **Security Headers**: Comprehensive security configuration
- **Webpack Optimizations**: SVG handling, path aliases, bundle splitting
- **Environment Variables**: Proper env var exposure to browser

### Path Aliases

The following aliases are configured for cleaner imports:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types";
```

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Required
NEXT_PUBLIC_APP_NAME=llammao-web
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional
CUSTOM_KEY=your-custom-key
```

## Bundle Analysis

To analyze your bundle size:

```bash
yarn build:analyze
```

This will generate HTML reports in the `analyze/` directory.

## Deployment

The application is configured with:

- **Standalone Output** for optimized Docker deployments
- **Static Asset Optimization** with proper caching headers
- **Security Headers** for production

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS base
# ... (Docker configuration using standalone output)
```

## Performance Tips

1. **Images**: Use the Next.js `Image` component for automatic optimization
2. **Fonts**: Use `next/font` for optimized font loading
3. **Imports**: Leverage tree-shaking with optimized package imports
4. **Bundle**: Monitor bundle size with the analyzer

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `yarn type-check` and `yarn lint`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
