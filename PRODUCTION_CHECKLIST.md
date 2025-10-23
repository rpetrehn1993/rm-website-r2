# Production Go-Live Checklist

Use this checklist to ensure your site is ready for production launch.

## Phase 1: Content & Metadata ✅

### Site Metadata
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local` and deployment platform
- [ ] Update site title in `src/app/layout.tsx`
- [ ] Write compelling description (155-160 characters)
- [ ] Add relevant keywords
- [ ] Update author information
- [ ] Set correct `@twitter` handle
- [ ] Update OpenGraph image path if using custom name

### Content
- [ ] Replace placeholder content in `src/app/page.tsx`
- [ ] Add proper alt text to all images
- [ ] Ensure all links work correctly
- [ ] Spell-check all content
- [ ] Review content for tone and accuracy

### Domain Configuration
- [ ] Update `robots.txt` with actual domain
- [ ] Verify sitemap includes all pages
- [ ] Update manifest.json with actual app name

## Phase 2: Brand Assets 🎨

### Favicon Files
- [ ] Replace default `favicon.ico` (32x32 or 48x48px)
- [ ] Add `apple-touch-icon.png` (180x180px)
- [ ] Add `icon-192.png` (192x192px)
- [ ] Add `icon-512.png` (512x512px)
- [ ] Test favicon displays in browser tab

### Social Media Assets
- [ ] Create `og-image.png` (1200x630px)
- [ ] Test OpenGraph preview with https://www.opengraph.xyz/
- [ ] Test Twitter Card preview
- [ ] Test LinkedIn share preview

## Phase 3: Performance Optimization ⚡

### Build & Bundle
- [ ] Run `npm run build` successfully
- [ ] Run `npm run analyze` to check bundle size
- [ ] Main bundle < 200KB gzipped
- [ ] No console errors or warnings

### Images
- [ ] All images optimized (compressed)
- [ ] All images use Next.js `<Image>` component
- [ ] Images have proper width/height attributes
- [ ] Above-the-fold images use `priority` prop
- [ ] Verify WebP/AVIF formats are generated

### Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run type-check` - no errors
- [ ] Run `npm run format:check` - properly formatted
- [ ] Remove console.log statements
- [ ] Remove commented-out code

## Phase 4: Cross-Browser Testing 🌐

### Desktop Browsers
- [ ] Chrome (Windows & macOS) - Latest version
- [ ] Safari (macOS) - Latest version
- [ ] Firefox (Windows & macOS) - Latest version
- [ ] Edge (Windows) - Latest version
- [ ] Check all pages load correctly
- [ ] Verify no layout breaks
- [ ] Test all interactive elements

### Mobile Devices
- [ ] iPhone Safari - Latest iOS
- [ ] Android Chrome - Latest version
- [ ] iPad - Portrait and landscape
- [ ] Test touch interactions
- [ ] Verify mobile navigation
- [ ] Check tap target sizes (min 44x44px)

## Phase 5: Performance Testing 📊

### Lighthouse Audit
- [ ] Run Lighthouse on homepage (desktop)
- [ ] Run Lighthouse on homepage (mobile)
- [ ] Performance score: 90+
- [ ] Accessibility score: 90+
- [ ] Best Practices score: 90+
- [ ] SEO score: 90+
- [ ] Fix any critical issues

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] FCP (First Contentful Paint) < 1.8s
- [ ] TTFB (Time to First Byte) < 600ms

### Network Testing
- [ ] Test on slow 3G connection
- [ ] Test with throttled CPU
- [ ] Verify images lazy-load
- [ ] Check fonts load without FOUT

## Phase 6: Accessibility ♿

### Manual Testing
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus indicators visible
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] All images have alt text
- [ ] Form labels are associated correctly
- [ ] Color contrast meets WCAG AA (4.5:1)

### Screen Reader Testing
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with NVDA (Windows) - if available
- [ ] All interactive elements are announced
- [ ] Navigation is logical

## Phase 7: SEO Validation 🔍

### Meta Tags
- [ ] Title tags are unique and descriptive
- [ ] Meta descriptions are compelling (155-160 chars)
- [ ] Canonical URLs are set correctly
- [ ] OpenGraph tags are complete
- [ ] Twitter Card tags are complete

### Technical SEO
- [ ] `robots.txt` is accessible at /robots.txt
- [ ] `sitemap.xml` is accessible at /sitemap.xml
- [ ] No broken internal links
- [ ] No broken external links
- [ ] SSL certificate is active (HTTPS)
- [ ] Test with Google Rich Results Test

## Phase 8: Security 🔒

### Security Headers
- [ ] X-Frame-Options configured
- [ ] X-Content-Type-Options configured
- [ ] X-XSS-Protection configured
- [ ] Strict-Transport-Security configured
- [ ] Permissions-Policy configured
- [ ] Verify headers with securityheaders.com

### Environment Variables
- [ ] All secrets in `.env.local` (not committed)
- [ ] `.env*` files in `.gitignore`
- [ ] Production environment variables configured
- [ ] No API keys in client-side code

## Phase 9: Deployment 🚀

### Pre-Deployment
- [ ] All changes committed to git
- [ ] Push to main/production branch
- [ ] Tag release version (e.g., v1.0.0)
- [ ] Backup any existing data

### Deployment Platform
- [ ] Environment variables configured
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Build settings correct (e.g., Node version)

### Post-Deployment
- [ ] Verify site loads at production URL
- [ ] Test all critical user paths
- [ ] Check browser console for errors
- [ ] Verify API routes work (if applicable)
- [ ] Test forms submit correctly (if applicable)

## Phase 10: Post-Launch Monitoring 📈

### Immediate (First 24 Hours)
- [ ] Monitor error logs
- [ ] Check server performance
- [ ] Watch for 404 errors
- [ ] Verify analytics tracking (if configured)

### First Week
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Check Core Web Vitals in production
- [ ] Monitor user feedback
- [ ] Test on real devices

### Future Enhancements
- [ ] Add Google Analytics (post-launch priority)
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Implement automated testing
- [ ] Add CI/CD improvements
- [ ] Set up performance monitoring

## Quick Pre-Launch Command Checklist

Run these commands before deploying:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format:check

# Production build
npm run build

# Test production build locally
npm run start
```

All should pass without errors before deployment.

## Need Help?

- **Performance Issues**: Use Chrome DevTools Performance tab
- **Accessibility**: Use WAVE browser extension
- **SEO**: Use Google Search Console
- **Security**: Use securityheaders.com
- **Mobile Testing**: Use BrowserStack or real devices

## Launch Day Checklist

### Morning of Launch
- [ ] Final content review
- [ ] Test all critical paths one more time
- [ ] Ensure team is available for monitoring
- [ ] Have rollback plan ready

### During Launch
- [ ] Deploy to production
- [ ] Verify deployment success
- [ ] Test immediately after deployment
- [ ] Monitor error logs

### After Launch
- [ ] Announce launch (social media, email, etc.)
- [ ] Monitor for first few hours
- [ ] Be ready to hotfix issues
- [ ] Celebrate! 🎉

---

**Last Updated**: Before each deployment
**Owner**: [Your Name/Team]

