import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.resolve(__dirname, '../public/images/products');

const imageConfigs = [
  {
    name: 'feature-step-1.jpg',
    outName: 'feature-step-1.webp',
    maxWidth: 1120,
    quality: 78,
  },
  {
    name: 'feature-step-2.jpg',
    outName: 'feature-step-2.webp',
    maxWidth: 1120,
    quality: 78,
  },
  {
    name: 'feature-step-3.jpg',
    outName: 'feature-step-3.webp',
    maxWidth: 1120,
    quality: 78,
  },
  {
    name: 'dailydoubt-showcase.jpg',
    outName: 'dailydoubt-showcase.webp',
    maxWidth: 1376,
    quality: 75,
  },
  {
    name: 'ui-builder-showcase.jpg',
    outName: 'ui-builder-showcase.webp',
    maxWidth: 1376,
    quality: 75,
  },
  {
    name: 'product-slide-2.jpg',
    outName: 'product-slide-2.webp',
    maxWidth: 1376,
    quality: 75,
  },
  {
    name: 'product-slide-3.jpg',
    outName: 'product-slide-3.webp',
    maxWidth: 1376,
    quality: 75,
  },
  {
    name: 'product-slide-4.jpg',
    outName: 'product-slide-4.webp',
    maxWidth: 1376,
    quality: 75,
  },
  {
    name: 'products-lab-preview.jpg',
    outName: 'products-lab-preview.webp',
    maxWidth: 1376,
    quality: 75,
  },
  {
    name: 'dailydoubt.png',
    outName: 'dailydoubt.webp',
    maxWidth: 1200,
    quality: 80,
  },
];

async function run() {
  console.log('--- Compressing Products Images with Sharp ---');
  let totalSaved = 0;

  for (const config of imageConfigs) {
    const inputPath = path.join(PRODUCTS_DIR, config.name);
    const outputPath = path.join(PRODUCTS_DIR, config.outName);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${config.name}`);
      continue;
    }

    const originalStats = fs.statSync(inputPath);
    const originalSizeKb = (originalStats.size / 1024).toFixed(1);

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let transform = sharp(inputPath);
    if (metadata.width && metadata.width > config.maxWidth) {
      transform = transform.resize({ width: config.maxWidth, withoutEnlargement: true });
    }

    await transform
      .webp({ quality: config.quality, effort: 6 })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSizeKb = (newStats.size / 1024).toFixed(1);
    const savedKb = originalStats.size - newStats.size;
    totalSaved += savedKb;

    const percent = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`✓ ${config.name} (${originalSizeKb} KB) -> ${config.outName} (${newSizeKb} KB) [${percent}% reduction]`);
  }

  console.log(`\nTotal bytes saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

run().catch((err) => {
  console.error('Image compression failed:', err);
  process.exit(1);
});
