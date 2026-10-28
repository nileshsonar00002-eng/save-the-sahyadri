const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const inputPath = 'C:/Users/SANDEEP/.gemini/antigravity/brain/dfd76fc1-33ea-4f46-969c-a816c07548cb/.user_uploaded/media_1793193866297_e2379cb5.jpg';
const jpegData = fs.readFileSync(inputPath);
const raw = jpeg.decode(jpegData, { useTArray: true });

console.log(`Decoded JPEG: ${raw.width}x${raw.height}`);

const width = raw.width;
const height = raw.height;
const png = new PNG({ width, height });

// Generate high quality transparent background
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = raw.data[idx];
    const g = raw.data[idx + 1];
    const b = raw.data[idx + 2];

    const maxVal = Math.max(r, g, b);
    let a = 255;
    if (maxVal < 14) {
      a = 0;
    } else if (maxVal < 36) {
      a = Math.round(((maxVal - 14) / 22) * 255);
    }

    png.data[idx] = r;
    png.data[idx + 1] = g;
    png.data[idx + 2] = b;
    png.data[idx + 3] = a;
  }
}

const buffer = PNG.sync.write(png);
const outPath = path.join(__dirname, '../public/images/tree-marker.png');
fs.writeFileSync(outPath, buffer);
console.log(`Saved ${outPath}: ${buffer.length} bytes`);
