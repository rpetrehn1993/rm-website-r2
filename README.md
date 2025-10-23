# RM Website R2

A high-performance, production-ready website built with Next.js 16, React 19, and TypeScript.

## Features

- ⚡️ **Next.js 16** with App Router
- ⚛️ **React 19** for modern UI development
- 🎨 **Tailwind CSS v4** for styling
- 📱 **Fully Responsive** - Optimized for all devices
- 🔒 **Security Hardened** - Comprehensive security headers
- 🚀 **Performance Optimized** - Fast load times and Core Web Vitals
- ♿️ **Accessible** - WCAG AA compliant
- 🔍 **SEO Ready** - Meta tags, sitemap, robots.txt
- 🌙 **Dark Mode** - Built-in theme support
- 📊 **Analytics Ready** - Google Analytics integration
- 🎯 **TypeScript** - Full type safety
- 🧪 **Linting & Formatting** - ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rm-website-r2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Update `.env.local` with your actual values:
   - `NEXT_PUBLIC_SITE_URL` - Your production domain
   - Other variables as needed

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```
├── public/              # Static assets (images, favicon, robots.txt)
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── api/        # API routes
│   │   ├── layout.tsx  # Root layout with metadata
│   │   ├── page.tsx    # Homepage
│   │   ├── error.tsx   # Error boundary
│   │   ├── not-found.tsx # 404 page
│   │   └── loading.tsx # Loading state
│   ├── components/     # React components
│   │   └── ui/        # Reusable UI components
│   └── lib/           # Utility functions and helpers
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Check TypeScript types
- `npm run analyze` - Analyze bundle size

## Brand Assets Setup

Before deploying, you need to add your brand assets. See [BRAND_ASSETS_GUIDE.md](./BRAND_ASSETS_GUIDE.md) for detailed instructions.

**Required files in `/public`:**
- `favicon.ico`
- `apple-touch-icon.png`
- `icon-192.png` and `icon-512.png`
- `og-image.png` (1200x630px for social media)

## Pre-Launch Checklist

See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for a comprehensive go-live checklist.

**Quick checklist:**
- [ ] Update metadata in `src/app/layout.tsx`
- [ ] Add brand assets (favicons, og-image)
- [ ] Update `.env.local` with production values
- [ ] Replace placeholder content
- [ ] Run `npm run build` successfully
- [ ] Test on multiple browsers and devices
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Configure deployment environment variables

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted with Node.js

## Performance

This site is optimized for performance:
- Automatic image optimization (WebP/AVIF)
- Code splitting and lazy loading
- Optimized fonts with `next/font`
- Compression enabled
- Bundle size monitoring

**Target metrics:**
- Lighthouse Performance: 90+
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

## Security

Security headers are configured in `next.config.ts`:
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- X-XSS-Protection (XSS protection)
- Strict-Transport-Security (HTTPS enforcement)
- Permissions-Policy (feature restrictions)
- Referrer-Policy

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and type checking
4. Submit a pull request

## License

[Your License Here]

## Support

For questions or issues, please [open an issue](your-repo-url/issues) or contact [your-email].
