// Crops and compresses the client's original images in assets-src/ into public/images/.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = 'public/images';
mkdirSync(out, { recursive: true });

const jobs = [
  { src: 'slider-bg-2-2.webp', name: 'hero-hake', crop: { left: 0, top: 0, width: 1130, height: 1141 }, widths: [1100, 640] },
  { src: 'about-pictures.png', name: 'story-polaroids', widths: [684] },
  { src: 'image-6.png', name: 'interview-702', widths: [400] },
  { src: 'logo-01.png', name: 'logo', widths: [360] },
];

for (const job of jobs) {
  for (const w of job.widths) {
    let img = sharp(`assets-src/${job.src}`);
    if (job.crop) img = img.extract(job.crop);
    const file = `${out}/${job.name}-${w}.webp`;
    const info = await img.resize({ width: w }).webp({ quality: 80 }).toFile(file);
    console.log(file, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
  }
}

// Favicon and touch icon from the shield logo on white.
await sharp('assets-src/logo-01.png').flatten({ background: '#ffffff' }).resize(180, 180, { fit: 'contain', background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');
await sharp('assets-src/logo-01.png').resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon.png');
// Social share card: hero photo, 1200 by 630.
await sharp('assets-src/slider-bg-2-2.webp').extract({ left: 0, top: 120, width: 1600, height: 840 }).resize(1200, 630).jpeg({ quality: 82 }).toFile('public/og-image.jpg');
console.log('icons and og-image written');
