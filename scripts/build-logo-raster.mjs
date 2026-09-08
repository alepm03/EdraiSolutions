/**
 * Rasteriza el símbolo de marca «Corte» (4b) a PNG/ICO sin dependencias.
 * La geometría es la misma que public/static/logo-mark.svg (viewBox 0 0 100 100).
 *
 *   node scripts/build-logo-raster.mjs
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'static');

const CYAN = [0x22, 0xd3, 0xee];
const NAVY = [0x0d, 0x1b, 0x2a];
const WHITE = [0xff, 0xff, 0xff];

// Cuadrado redondeado del clip: x/y 4..96, radio 26.
const R = 26, MIN = 4, MAX = 96;
const insideRounded = (x, y) => {
  if (x < MIN || x > MAX || y < MIN || y > MAX) return false;
  const cx = Math.min(Math.max(x, MIN + R), MAX - R);
  const cy = Math.min(Math.max(y, MIN + R), MAX - R);
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= R * R;
};

// Corte diagonal a 30°: normal (0.5, 0.866), hueco de 7 unidades centrado.
const NX = 0.5, NY = Math.sqrt(3) / 2, HALF_GAP = 3.5;
const side = (x, y) => {
  const d = NX * (x - 50) + NY * (y - 50);
  if (d < -HALF_GAP) return 'a';   // mitad superior-izquierda
  if (d > HALF_GAP) return 'b';    // mitad inferior-derecha
  return null;                     // hueco del corte
};

const SS = 4; // supersampling 4x4 por píxel

function render(size, secondColor) {
  const px = Buffer.alloc(size * size * 4);
  for (let py = 0; py < size; py++) {
    for (let pxi = 0; pxi < size; pxi++) {
      let ca = 0, cb = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = ((pxi + (sx + 0.5) / SS) / size) * 100;
          const y = ((py + (sy + 0.5) / SS) / size) * 100;
          if (!insideRounded(x, y)) continue;
          const s = side(x, y);
          if (s === 'a') ca++; else if (s === 'b') cb++;
        }
      }
      const total = SS * SS;
      const alpha = (ca + cb) / total;
      const i = (py * size + pxi) * 4;
      if (alpha > 0) {
        // Mezcla ponderada de los dos colores dentro del píxel.
        const wa = ca / (ca + cb), wb = 1 - wa;
        for (let k = 0; k < 3; k++) px[i + k] = Math.round(CYAN[k] * wa + secondColor[k] * wb);
        px[i + 3] = Math.round(alpha * 255);
      }
    }
  }
  return px;
}

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = c ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function toPng(size, px) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filtro None
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8 bits, RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + pngs.length * 16;
  const dir = [];
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size; e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
    dir.push(e); offset += buf.length;
  }
  return Buffer.concat([header, ...dir, ...pngs.map(p => p.buf)]);
}

mkdirSync(OUT, { recursive: true });
const png = (size, color) => toPng(size, render(size, color));

const targets = [
  ['favicon-48x48.png', 48, NAVY],
  ['apple-touch-icon.png', 180, NAVY],
  ['logo-mark-512.png', 512, NAVY],
  ['logo-mark-inverse-512.png', 512, WHITE],
  ['logo-mark-1024.png', 1024, NAVY],
];
for (const [name, size, color] of targets) {
  writeFileSync(join(OUT, name), png(size, color));
  console.log(`  ${name}  (${size}px)`);
}
writeFileSync(join(OUT, 'favicon.ico'), toIco([16, 32, 48].map(s => ({ size: s, buf: png(s, NAVY) }))));
console.log('  favicon.ico  (16/32/48)');
