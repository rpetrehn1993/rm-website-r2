# Deployment Guide

Quick guide to deploy your RM Website R2 to production.

## Pre-Deployment Checklist

Before deploying, ensure you've completed these essential tasks:

### 1. Content Updates
- [ ] Update site metadata in `src/app/layout.tsx`
- [ ] Replace placeholder content in `src/app/page.tsx`
- [ ] Add your brand assets (see `BRAND_ASSETS_GUIDE.md`)

### 2. Environment Variables
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Update `robots.txt` with your actual domain
- [ ] Configure any API keys or secrets

### 3. Build Verification
```bash
npm run type-check  # Should pass
npm run lint        # Should pass
npm run build       # Should complete successfully
```

---

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and provides the best developer experience.

#### Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com`
     - Any other variables from `.env.local`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Every push to `main` will trigger a new deployment

5. **Add Custom Domain**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions
   - SSL is automatically configured

#### Vercel Features:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for branches
- ✅ Built-in analytics
- ✅ Edge functions support

---

### Option 2: Netlify

Another excellent option with similar features to Vercel.

#### Steps:

1. **Push code to GitHub** (if not already done)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20 or higher

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add your environment variables

5. **Deploy**
   - Click "Deploy site"
   - Future pushes to main will auto-deploy

---

### Option 3: Self-Hosted (VPS/Cloud)

For more control, deploy to your own server.

#### Requirements:
- Node.js 20+
- PM2 or similar process manager
- Nginx or Apache (as reverse proxy)
- SSL certificate (Let's Encrypt)

#### Steps:

1. **Build the application locally**
   ```bash
   npm run build
   ```

2. **Upload to server**
   ```bash
   # Using scp or rsync
   rsync -avz --exclude node_modules . user@yourserver:/var/www/your-site/
   ```

3. **Install dependencies on server**
   ```bash
   ssh user@yourserver
   cd /var/www/your-site
   npm install --production
   ```

4. **Set up environment variables**
   ```bash
   # Create .env.local on server
   nano .env.local
   # Add your production variables
   ```

5. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "rm-website" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Set up SSL with Certbot**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

### Option 4: Docker Deployment

Deploy using Docker containers.

#### Create Dockerfile:
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

#### Build and run:
```bash
docker build -t rm-website .
docker run -p 3000:3000 --env-file .env.local rm-website
```

---

## Post-Deployment

### Immediate Checks (First 10 minutes)

1. **Verify site loads**
   - Visit your production URL
   - Check homepage loads correctly
   - Test navigation

2. **Check SSL certificate**
   - Ensure HTTPS is working
   - Check for mixed content warnings

3. **Test critical paths**
   - Test all main navigation links
   - Verify forms work (if applicable)
   - Check mobile responsiveness

4. **Browser Console**
   - Open DevTools → Console
   - Verify no errors

### First 24 Hours

1. **Monitor errors**
   - Check deployment logs
   - Watch for 404 errors
   - Monitor server performance

2. **Test on real devices**
   - iPhone/iPad
   - Android devices
   - Different browsers

3. **SEO verification**
   - Visit `yourdomain.com/robots.txt`
   - Visit `yourdomain.com/sitemap.xml`
   - Test social media sharing

### First Week

1. **Submit to Search Engines**
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters

2. **Performance monitoring**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor page load times

3. **Analytics setup**
   - Add Google Analytics (if not done)
   - Verify tracking is working

---

## Troubleshooting

### Build Fails

**Issue**: Build fails during deployment

**Solutions**:
1. Run `npm run build` locally to see the error
2. Check TypeScript errors: `npm run type-check`
3. Check linting: `npm run lint`
4. Verify all dependencies are installed
5. Check Node version matches (20+)

### Environment Variables Not Working

**Issue**: Site works locally but not in production

**Solutions**:
1. Verify environment variables are set in hosting platform
2. Ensure `NEXT_PUBLIC_` prefix for client-side variables
3. Restart/redeploy after adding variables
4. Check for typos in variable names

### 404 on Custom Domain

**Issue**: Site works on deployment URL but not custom domain

**Solutions**:
1. Verify DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Check domain configuration in hosting platform
4. Ensure SSL certificate is provisioned

### Slow Performance

**Issue**: Site loads slowly in production

**Solutions**:
1. Run Lighthouse audit to identify issues
2. Check image sizes and optimization
3. Verify CDN is enabled
4. Check server response times
5. Review bundle size with `npm run analyze`

---

## Rollback Plan

If something goes wrong:

### Vercel/Netlify
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Self-Hosted
1. Keep previous version as backup:
   ```bash
   cp -r /var/www/your-site /var/www/your-site-backup-$(date +%Y%m%d)
   ```
2. Restore if needed:
   ```bash
   rm -rf /var/www/your-site
   cp -r /var/www/your-site-backup-YYYYMMDD /var/www/your-site
   pm2 restart rm-website
   ```

---

## Performance Optimization Tips

1. **Enable Caching**
   - Most hosting platforms handle this automatically
   - For self-hosted, configure Nginx caching

2. **Use a CDN**
   - Vercel and Netlify include CDN
   - For self-hosted, consider Cloudflare

3. **Monitor Core Web Vitals**
   - Use Google PageSpeed Insights
   - Monitor in Google Search Console

4. **Optimize Images**
   - Next.js handles this automatically
   - Ensure you're using the `<Image>` component

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured (already done in `next.config.ts`)
- [ ] Environment variables secured (not in git)
- [ ] API keys in environment variables only
- [ ] Rate limiting configured (if needed)
- [ ] CORS configured properly (if using API)

---

## Support & Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://www.netlify.com/support/

---

## Quick Command Reference

```bash
# Pre-deployment checks
npm run type-check
npm run lint
npm run build

# Test production build locally
npm run start

# Analyze bundle size
npm run analyze

# Format code
npm run format
```

---

**Last Updated**: Before deployment
**Deployment Date**: _____________________
**Deployed By**: _____________________
**Production URL**: _____________________

