# Figma → Cursor Workflow Guide

You have a **complete Figma integration** already built into this project! Here's how to leverage it.

---

## 🎯 Quick Start

### 1. Set Up Figma Credentials

**Get your Figma Access Token:**
1. Go to [Figma Settings](https://www.figma.com/settings)
2. Scroll to "Personal access tokens"
3. Click "Generate new token"
4. Copy the token (starts with `figd_`)

**Get your File Key:**
1. Open your Figma design file
2. Copy the URL from browser
3. Extract the file key:
   ```
   https://figma.com/file/ABC123DEF456/My-Design
                          ↑ This is your file key
   ```

**Add to `.env.local`:**
```bash
FIGMA_ACCESS_TOKEN=figd_your_actual_token_here
FIGMA_FILE_KEY=ABC123DEF456
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🧪 Test Your Connection

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open test page:**
   ```
   http://localhost:3000/test-figma
   ```

3. **Enter your file key and click "Test Connection"**
   - You should see your Figma file name
   - Design tokens will be extracted and displayed
   - Any errors will show helpful messages

---

## 🔄 Built-in Features

### 1. Auto-Extract Design Tokens

Your integration automatically extracts:

**Colors:**
```javascript
// From Figma color styles
{
  "Primary Blue": "#0066FF",
  "Background": "#F0F0EE",
  "Text Dark": "#1E1E1E"
}
```

**Typography:**
```javascript
// From text layers
{
  "Helvetica-48": {
    fontFamily: "Helvetica Neue",
    fontSize: 48,
    fontWeight: 700
  }
}
```

**Use these to generate your CSS variables!**

---

### 2. Export Assets from Figma

**Current setup in `src/lib/figma.ts`:**

```typescript
// Export specific nodes as images
const images = await getFigmaImages(
  fileKey, 
  ['123:456', '789:012'],  // Node IDs from Figma
);

// Returns download URLs:
{
  "123:456": "https://s3.amazonaws.com/...",
  "789:012": "https://s3.amazonaws.com/..."
}
```

**How to get Node IDs:**
1. Select layer in Figma
2. Right-click → "Copy/Paste as" → "Copy link"
3. URL contains: `node-id=123-456` → convert to `123:456`

---

## 🎨 Recommended Workflows

### Workflow A: Manual Export (Current)
✅ **What you're doing now**

1. Design in Figma
2. Export assets manually (File → Export)
3. Add to `/public/assets/`
4. Copy styles and implement in code

**Pros:** Full control, no API limits
**Cons:** Manual work for updates

---

### Workflow B: Semi-Automated (Recommended)

1. **Design in Figma**
2. **Use API for tokens:** Extract colors/fonts automatically
3. **Export assets manually:** Complex graphics from Figma
4. **Sync on updates:** Re-run token extraction when design changes

**Steps:**
```bash
# 1. Update Figma design
# 2. Run your test page to see new tokens
npm run dev
# Visit: http://localhost:3000/test-figma

# 3. Copy new tokens to globals.css
# 4. Export any new assets manually
```

**Pros:** Automate repetitive parts (tokens)
**Cons:** Still manual for assets

---

### Workflow C: Fully Automated (Advanced)

**Build a sync script that:**
1. Fetches Figma file on build
2. Extracts tokens → generates CSS
3. Downloads assets → saves to public folder
4. Runs during deployment

**Example script location:** `scripts/sync-figma.mjs`

**Pros:** Fully automated, always in sync
**Cons:** Requires build-time setup, API rate limits

---

## 🛠️ Current Capabilities

### ✅ Already Working

- **Fetch Figma files** (`getFigmaFile()`)
- **Export images** (`getFigmaImages()`)
- **Extract design tokens** (`extractDesignTokens()`)
- **Server-side API** (keeps token secure)
- **Test interface** (debug your connection)

### 🔨 You Can Add

**1. Token Generator Script:**
```javascript
// scripts/generate-tokens.mjs
// Fetches Figma file and writes to globals.css
```

**2. Asset Downloader:**
```javascript
// scripts/download-assets.mjs
// Downloads all images from Figma to /public/assets/
```

**3. Component Generator:**
```javascript
// Advanced: Generate React components from Figma frames
```

---

## 📋 Using the API in Your Code

### Example: Fetch Design Tokens

**In a server component or API route:**

```typescript
import { getFigmaFile, extractDesignTokens } from '@/lib/figma';

// Fetch file
const figmaData = await getFigmaFile('YOUR_FILE_KEY');

// Extract tokens
const tokens = extractDesignTokens(figmaData);

console.log(tokens.colors);
// { "Primary": "#0066FF", ... }

console.log(tokens.typography);
// { "Heading-Large": { fontFamily: "Helvetica", ... } }
```

---

## 🔐 Security Best Practices

✅ **Your setup follows best practices:**

1. **Token in `.env.local`** - Never committed to git
2. **Server-side API route** - Token never exposed to client
3. **`.gitignore` configured** - Env files excluded

**Never:**
- ❌ Put Figma token in client-side code
- ❌ Commit `.env.local` to git
- ❌ Share token in screenshots/videos

---

## 📊 API Limits & Performance

**Figma API Limits:**
- Free: 1,000 requests/hour
- Professional: 10,000 requests/hour

**Best Practices:**
1. **Cache results** - Don't fetch on every page load
2. **Fetch at build time** - Use at deployment, not runtime
3. **Export critical assets** - Don't fetch images on-demand

---

## 🚀 Quick Commands

```bash
# Test Figma connection
npm run dev
# Then visit: http://localhost:3000/test-figma

# Check for missing assets
npm run check-assets

# Build production (will fail if assets missing)
npm run build
```

---

## 🎯 Recommended Next Steps

### For Your Current Project:

1. **Set up credentials** (5 mins)
   - Add `FIGMA_ACCESS_TOKEN` to `.env.local`
   - Add `FIGMA_FILE_KEY` to `.env.local`

2. **Test connection** (2 mins)
   - Run `npm run dev`
   - Visit `/test-figma`
   - Verify it works

3. **Extract your tokens** (10 mins)
   - Use test page to see extracted colors/fonts
   - Compare with your current CSS variables
   - Verify they match your design

4. **Export assets manually** (30 mins)
   - Create `/public/assets/` folder
   - Export images from Figma
   - Use `npm run check-assets` to verify

5. **Optional: Automate later** (1-2 hours)
   - Build token generator script
   - Set up asset downloader
   - Run during deployment

---

## 🆘 Troubleshooting

### "FIGMA_ACCESS_TOKEN is not set"
- Add token to `.env.local`
- Restart dev server
- Token should start with `figd_`

### "Figma API error: 403"
- Token is invalid or expired
- Generate new token in Figma settings
- Ensure token has file access

### "Figma API error: 404"
- File key is incorrect
- Double-check the file key from URL
- Ensure you have access to the file

### No tokens extracted
- File might not have color/text styles defined
- Check Figma file has styles configured
- Try a different file for testing

---

## 📚 Resources

- **Your integration code:** `src/lib/figma.ts`
- **API route:** `src/app/api/figma/route.ts`
- **Test page:** `src/app/test-figma/page.tsx`
- **Figma API docs:** https://www.figma.com/developers/api
- **Design tokens:** https://designtokens.org/

---

## 💡 Pro Tips

1. **Use Figma Styles:** Define colors/text styles in Figma for auto-extraction
2. **Name consistently:** Use clear names like "Primary/Blue" for tokens
3. **Organize layers:** Use Figma's groups/frames for better structure
4. **Version control:** Tag Figma file versions for major design updates
5. **Document node IDs:** Keep a list of important node IDs for asset export

---

**You're all set!** Your Figma integration is production-ready. Just add your credentials and start using it. 🎉

