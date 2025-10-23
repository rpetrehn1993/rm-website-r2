# 🎨 Figma Integration Guide

Your website has a **complete Figma integration** that allows you to sync design tokens automatically. Here's how to use it effectively.

## ✅ What's Already Working

### 1. **Figma API Connection** ✅
- ✅ Credentials configured in `.env.local`
- ✅ API routes working (`/api/figma`)
- ✅ Test page available at `/test-figma`

### 2. **Design Token Extraction** ✅
- ✅ Colors from Figma styles
- ✅ Typography from text layers
- ✅ Spacing values
- ✅ Border radius values

### 3. **Automated Sync Script** ✅
- ✅ `npm run sync-figma` command
- ✅ Updates CSS variables automatically
- ✅ Generates Tailwind config

## 🚀 How to Use

### Quick Sync (Most Common)
```bash
# 1. Make changes in Figma
# 2. Run the sync command
npm run sync-figma

# 3. Your CSS is automatically updated!
```

### Manual Testing
```bash
# Test your Figma connection
npm run dev
# Visit: http://localhost:3000/test-figma
```

## 📋 Current Design Tokens

Based on your Figma file, here are the extracted tokens:

### Typography (23 tokens)
- **Times New Roman**: 20px, 24px, 32px, 36px, 40px, 64px
- **Helvetica Neue**: 12px, 16px, 20px, 22.5px, 24px, 30px, 32px, 36px, 40px, 48px, 64px, 128px
- **Degular Variable**: 30px, 50px, 64px

### Colors
- Currently: No color styles found in Figma
- **Recommendation**: Create color styles in Figma for automatic extraction

### Spacing & Border Radius
- Currently: No spacing/border radius styles found
- **Recommendation**: Create spacing/border radius styles in Figma

## 🔧 How to Improve Your Figma Integration

### 1. **Create Color Styles in Figma**
1. Open your Figma file
2. Select a color in your design
3. Click the "Style" icon (diamond) in the right panel
4. Click "+" to create a new style
5. Name it clearly (e.g., "Primary Blue", "Accent Red")
6. Repeat for all your brand colors

### 2. **Create Typography Styles**
1. Select text in your design
2. Click the "Style" icon (diamond) in the right panel
3. Click "+" to create a new style
4. Name it clearly (e.g., "Heading Large", "Body Text")
5. Repeat for all your text styles

### 3. **Create Spacing Styles**
1. Select a frame with consistent spacing
2. Create a style for spacing values
3. Name it clearly (e.g., "Small", "Medium", "Large")

## 🎯 Workflow Examples

### Example 1: Update Brand Colors
```bash
# 1. In Figma: Update your color styles
# 2. Run sync
npm run sync-figma

# 3. Check the updated CSS
cat src/app/globals.css
```

### Example 2: Add New Typography
```bash
# 1. In Figma: Create new text styles
# 2. Run sync
npm run sync-figma

# 3. Use in your components
# font-family: var(--font-heading-large);
```

### Example 3: Export Assets
```bash
# 1. Get node IDs from Figma (right-click → Copy link)
# 2. Use the API to export images
curl "http://localhost:3000/api/figma?fileKey=YOUR_FILE_KEY&action=images&nodeIds=123:456,789:012"
```

## 📁 File Structure

```
scripts/
├── sync-figma-tokens.mjs    # Main sync script
└── check-assets.mjs         # Asset validation

src/
├── app/
│   ├── api/figma/route.ts   # Figma API endpoint
│   └── test-figma/page.tsx  # Test interface
├── lib/figma.ts            # Figma utilities
└── app/globals.css         # Auto-updated CSS variables
```

## 🔍 Troubleshooting

### "Missing Figma credentials"
```bash
# Check your .env.local file
cat .env.local
# Should contain:
# FIGMA_ACCESS_TOKEN=figd_...
# FIGMA_FILE_KEY=...
```

### "Failed to fetch Figma tokens"
```bash
# Make sure dev server is running
npm run dev

# Then run sync
npm run sync-figma
```

### "No colors extracted"
- Create color styles in Figma
- Use the "Style" panel to create named styles
- Re-run `npm run sync-figma`

### "Typography not updating"
- Ensure text layers use the styles you created
- Check that styles are applied to text, not just frames
- Re-run `npm run sync-figma`

## 🎨 Best Practices

### 1. **Naming Convention**
- Colors: "Primary Blue", "Accent Red", "Background White"
- Typography: "Heading Large", "Body Text", "Caption"
- Spacing: "Small", "Medium", "Large", "XL"

### 2. **Organization**
- Group related styles in Figma
- Use consistent naming
- Document your design system

### 3. **Version Control**
- Commit your `.env.local` to git (it's already in .gitignore)
- Don't commit generated CSS sections
- Tag releases when design changes

## 🚀 Advanced Usage

### Custom Sync Script
```javascript
// scripts/custom-sync.mjs
import { getFigmaFile, extractDesignTokens } from './src/lib/figma.js';

const tokens = await extractDesignTokens(figmaFile);
// Custom processing here
```

### CI/CD Integration
```yaml
# .github/workflows/sync-figma.yml
name: Sync Figma
on:
  schedule:
    - cron: '0 9 * * 1'  # Weekly on Monday
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run sync-figma
      - run: git commit -am "Auto-sync design tokens"
```

## 📊 Performance

### API Limits
- **Free**: 1,000 requests/hour
- **Professional**: 10,000 requests/hour
- **Best Practice**: Run sync manually, not on every build

### Caching
- Tokens are cached in your CSS file
- No runtime API calls to Figma
- Fast website performance

## 🎉 Success Metrics

Your integration is working when:
- ✅ `npm run sync-figma` runs without errors
- ✅ CSS variables are updated in `globals.css`
- ✅ Typography tokens are extracted
- ✅ Colors are extracted (when you create styles)
- ✅ Website uses the synced tokens

## 🔄 Next Steps

1. **Create color styles in Figma** for automatic color sync
2. **Organize your typography styles** for better token extraction
3. **Set up spacing styles** for consistent spacing
4. **Run sync regularly** when you update designs
5. **Use the extracted tokens** in your components

## 📞 Support

- **Test page**: http://localhost:3000/test-figma
- **API docs**: http://localhost:3000/api/figma
- **Figma API docs**: https://www.figma.com/developers/api

---

**Your Figma integration is production-ready!** 🎉
Just create styles in Figma and run `npm run sync-figma` to keep everything in sync.
