# Brand Assets Setup Guide

This guide will help you prepare and add your brand assets to the website for optimal display across all devices and platforms.

## Required Assets Checklist

### Favicon Files
Place these files in the `/public` directory:

- **favicon.ico** (32x32 or 48x48 pixels)
  - Classic favicon for browser tabs
  - ICO format preferred for maximum compatibility

- **favicon-16x16.png** (16x16 pixels)
  - Small size for browser tabs

- **favicon-32x32.png** (32x32 pixels)
  - Standard size for browser tabs

### Apple Touch Icon
- **apple-touch-icon.png** (180x180 pixels)
  - Used when users add your site to their iOS home screen
  - Should have solid background (no transparency)

### PWA Icons (for Progressive Web App support)
- **icon-192.png** (192x192 pixels)
  - Required for Android home screen
  - Can have transparency

- **icon-512.png** (512x512 pixels)
  - Required for Android splash screens
  - Can have transparency

### Social Media Image
- **og-image.png** (1200x630 pixels)
  - Used for Open Graph (Facebook, LinkedIn, etc.) and Twitter Cards
  - Should include your logo/branding and optionally a tagline
  - Keep important content in the center (safe zone)
  - Text should be large and readable

## Design Recommendations

### General Guidelines
- Use PNG format with transparency for app icons (except apple-touch-icon)
- Use high-quality, crisp images (avoid blurriness or pixelation)
- Ensure your logo/icon is centered with adequate padding
- Test dark mode compatibility for icons

### Color Considerations
- Your favicon should be recognizable even at tiny sizes
- Consider how your icon looks against both light and dark backgrounds
- Use sufficient contrast for legibility

### Tools for Creating Assets
- **Favicon Generator**: https://realfavicongenerator.net/
- **Image Optimization**: TinyPNG (https://tinypng.com/)
- **Social Media Preview**: https://www.opengraph.xyz/

## Quick Generation Steps

If you have a single logo/icon file (at least 512x512px):

1. **Use Favicon Generator**:
   - Go to https://realfavicongenerator.net/
   - Upload your logo/icon
   - Configure for all platforms
   - Download the generated package

2. **Create OG Image**:
   - Create a 1200x630px canvas in your design tool
   - Add your logo, site name, and optional tagline
   - Export as PNG
   - Optimize with TinyPNG
   - Save as `og-image.png`

3. **Place Files**:
   - Move all favicon files to `/public` directory
   - Verify filenames match the ones listed above

## Verification

After adding your assets:

1. **Local Testing**:
   ```bash
   npm run dev
   ```
   - Check favicon appears in browser tab
   - View page source and verify all icons are referenced

2. **Social Media Preview**:
   - Use https://www.opengraph.xyz/ to preview
   - Test both Twitter and Facebook previews

3. **Mobile Testing**:
   - Test "Add to Home Screen" on iOS Safari
   - Test "Add to Home Screen" on Android Chrome

## Current Status

- [ ] Replace default `favicon.ico`
- [ ] Add `apple-touch-icon.png`
- [ ] Add `icon-192.png` and `icon-512.png`
- [ ] Create and add `og-image.png`
- [ ] Test all icons display correctly
- [ ] Verify social media previews

## Need Help?

If you need assistance creating these assets, consider:
- Hiring a designer on Fiverr or Upwork
- Using Canva templates for social media images
- Using AI tools like DALL-E or Midjourney for icon generation

