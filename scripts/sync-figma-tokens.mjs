#!/usr/bin/env node

/**
 * Figma Design Token Sync Script
 * 
 * This script fetches design tokens from your Figma file and updates your CSS variables.
 * Run this whenever you update your Figma design to keep your website in sync.
 * 
 * Usage:
 *   npm run sync-figma
 *   node scripts/sync-figma-tokens.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_FILE_KEY || !FIGMA_ACCESS_TOKEN) {
  console.error('❌ Missing Figma credentials');
  console.error('Please set FIGMA_FILE_KEY and FIGMA_ACCESS_TOKEN in your .env.local file');
  process.exit(1);
}

async function fetchFigmaTokens() {
  try {
    console.log('🔄 Fetching design tokens from Figma...');
    
    const response = await fetch(`http://localhost:3000/api/figma?fileKey=${FIGMA_FILE_KEY}&action=tokens`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.tokens;
  } catch (error) {
    console.error('❌ Failed to fetch Figma tokens:', error.message);
    console.error('Make sure your dev server is running: npm run dev');
    process.exit(1);
  }
}

function generateCSSVariables(tokens) {
  let css = '\n/* Auto-generated from Figma - DO NOT EDIT MANUALLY */\n';
  css += '/* Generated on: ' + new Date().toISOString() + ' */\n\n';
  
  // Generate color variables
  if (tokens.colors && Object.keys(tokens.colors).length > 0) {
    css += ':root {\n';
    Object.entries(tokens.colors).forEach(([name, value]) => {
      const cssVarName = `--color-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${cssVarName}: ${value};\n`;
    });
    css += '}\n\n';
  }
  
  // Generate typography variables
  if (tokens.typography && Object.keys(tokens.typography).length > 0) {
    css += '/* Typography tokens from Figma */\n';
    Object.entries(tokens.typography).forEach(([name, config]) => {
      const cssVarName = `--font-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `/* ${cssVarName}: ${config.fontFamily} ${config.fontSize}px ${config.fontWeight} */\n`;
    });
    css += '\n';
  }
  
  // Generate spacing variables
  if (tokens.spacing && Object.keys(tokens.spacing).length > 0) {
    css += ':root {\n';
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      const cssVarName = `--spacing-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${cssVarName}: ${value};\n`;
    });
    css += '}\n\n';
  }
  
  // Generate border radius variables
  if (tokens.borderRadius && Object.keys(tokens.borderRadius).length > 0) {
    css += ':root {\n';
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      const cssVarName = `--radius-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${cssVarName}: ${value};\n`;
    });
    css += '}\n\n';
  }
  
  return css;
}

function updateGlobalsCSS(tokens) {
  const globalsPath = join(process.cwd(), 'src/app/globals.css');
  
  try {
    let content = readFileSync(globalsPath, 'utf8');
    
    // Remove old auto-generated section
    const startMarker = '/* Auto-generated from Figma - DO NOT EDIT MANUALLY */';
    const endMarker = '/* End auto-generated section */';
    
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    
    if (startIndex !== -1 && endIndex !== -1) {
      content = content.slice(0, startIndex) + content.slice(endIndex + endMarker.length);
    }
    
    // Generate new CSS variables
    const newCSS = generateCSSVariables(tokens);
    
    // Add the new section
    content += newCSS + '/* End auto-generated section */\n';
    
    // Write back to file
    writeFileSync(globalsPath, content);
    
    console.log('✅ Updated src/app/globals.css with new design tokens');
  } catch (error) {
    console.error('❌ Failed to update globals.css:', error.message);
    process.exit(1);
  }
}

function generateTailwindConfig(tokens) {
  const config = {
    colors: {},
    fontFamily: {},
    fontSize: {},
    spacing: {},
    borderRadius: {}
  };
  
  // Process colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([name, value]) => {
      const key = name.toLowerCase().replace(/\s+/g, '-');
      config.colors[key] = value;
    });
  }
  
  // Process typography
  if (tokens.typography) {
    const fontFamilies = new Set();
    const fontSizes = new Set();
    
    Object.values(tokens.typography).forEach(config => {
      fontFamilies.add(config.fontFamily);
      fontSizes.add(config.fontSize);
    });
    
    config.fontFamily = Object.fromEntries([...fontFamilies].map(font => [font, [font]]));
    config.fontSize = Object.fromEntries([...fontSizes].map(size => [size, [`${size}px`]]));
  }
  
  // Process spacing
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      const key = name.toLowerCase().replace(/\s+/g, '-');
      config.spacing[key] = value;
    });
  }
  
  // Process border radius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      const key = name.toLowerCase().replace(/\s+/g, '-');
      config.borderRadius[key] = value;
    });
  }
  
  return config;
}

function updateTailwindConfig(tokens) {
  const configPath = join(process.cwd(), 'tailwind.config.ts');
  
  try {
    let content = readFileSync(configPath, 'utf8');
    
    // Generate Tailwind config
    const tailwindConfig = generateTailwindConfig(tokens);
    
    // Create new config content
    const newConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindConfig.colors, null, 6)},
      fontFamily: ${JSON.stringify(tailwindConfig.fontFamily, null, 6)},
      fontSize: ${JSON.stringify(tailwindConfig.fontSize, null, 6)},
      spacing: ${JSON.stringify(tailwindConfig.spacing, null, 6)},
      borderRadius: ${JSON.stringify(tailwindConfig.borderRadius, null, 6)},
    },
  },
  plugins: [],
};

export default config;`;
    
    writeFileSync(configPath, newConfig);
    
    console.log('✅ Updated tailwind.config.ts with new design tokens');
  } catch (error) {
    console.error('❌ Failed to update tailwind.config.ts:', error.message);
    // Don't exit, this is optional
  }
}

async function main() {
  console.log('🎨 Figma Design Token Sync');
  console.log('========================\n');
  
  // Fetch tokens from Figma
  const tokens = await fetchFigmaTokens();
  
  console.log('📊 Extracted tokens:');
  console.log(`  • Colors: ${Object.keys(tokens.colors || {}).length}`);
  console.log(`  • Typography: ${Object.keys(tokens.typography || {}).length}`);
  console.log(`  • Spacing: ${Object.keys(tokens.spacing || {}).length}`);
  console.log(`  • Border Radius: ${Object.keys(tokens.borderRadius || {}).length}\n`);
  
  // Update CSS variables
  updateGlobalsCSS(tokens);
  
  // Update Tailwind config (optional)
  updateTailwindConfig(tokens);
  
  console.log('\n🎉 Sync complete! Your design tokens are now up to date.');
  console.log('\nNext steps:');
  console.log('1. Review the updated CSS variables in src/app/globals.css');
  console.log('2. Update your components to use the new design tokens');
  console.log('3. Test your website to ensure everything looks correct');
  console.log('\nTo use these tokens in your CSS:');
  console.log('  color: var(--color-primary);');
  console.log('  font-family: var(--font-helvetica-neue-24);');
}

main().catch(console.error);
