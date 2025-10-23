#!/usr/bin/env node

/**
 * Asset Checker - Verifies all required assets are present
 * Run: node scripts/check-assets.mjs
 */

import { existsSync } from 'fs';
import { join } from 'path';

const REQUIRED_ASSETS = [
  'public/assets/hero-asset.png',
  'public/assets/logo-white.svg',
  'public/assets/menu-icon.svg',
  'public/assets/play-icon.svg',
  'public/assets/selected-works.svg',
  'public/assets/project-1.png',
  'public/assets/project-2.png',
  'public/assets/project-3.png',
  'public/assets/project-4.png',
  'public/assets/project-5.png',
  'public/assets/main-logo.svg',
];

const BRAND_ASSETS = [
  'public/favicon.ico',
  'public/apple-touch-icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/og-image.png',
];

console.log('🔍 Checking required assets...\n');

let missingCount = 0;
let missingAssets = [];

console.log('📦 Content Assets:');
REQUIRED_ASSETS.forEach(asset => {
  const exists = existsSync(asset);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${asset}`);
  if (!exists) {
    missingCount++;
    missingAssets.push(asset);
  }
});

console.log('\n🎨 Brand Assets:');
BRAND_ASSETS.forEach(asset => {
  const exists = existsSync(asset);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${asset}`);
  if (!exists) {
    missingCount++;
    missingAssets.push(asset);
  }
});

console.log('\n' + '='.repeat(50));
if (missingCount === 0) {
  console.log('✅ All assets present! Ready for production.');
} else {
  console.log(`❌ Missing ${missingCount} asset(s):\n`);
  missingAssets.forEach(asset => {
    console.log(`   - ${asset}`);
  });
  console.log('\n📝 Export these from Figma and add to your project.');
  process.exit(1);
}

