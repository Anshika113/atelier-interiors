/**
 * Downloads free-licensed interior photos into public/images/ so the site shows
 * real photography that also works offline. Themed photos come from LoremFlickr;
 * if one isn't available it falls back to a generic Picsum photo.
 *
 * Run once from the `frontend` folder:  node download-images.js
 * To use your OWN pictures, drop files with the same names into public/images/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'public', 'images')

// [outputPath, keywords, lock, picsumSeed, width, height]
const targets = [
  ['hero/main.jpg', 'interior,living-room,luxury', 61, 'atl-main', 1000, 1200],
  ['hero/a.jpg', 'interior,kitchen', 62, 'atl-a', 700, 700],
  ['hero/b.jpg', 'interior,bedroom', 63, 'atl-b', 700, 700],
  ['services/residential.jpg', 'interior,living-room', 71, 'svc-res', 900, 700],
  ['services/commercial.jpg', 'office,interior,modern', 72, 'svc-com', 900, 700],
  ['services/kitchen.jpg', 'modular,kitchen,interior', 73, 'svc-kit', 900, 700],
  ['services/bedroom.jpg', 'bedroom,interior,cozy', 74, 'svc-bed', 900, 700],
  ['services/living.jpg', 'living-room,interior,sofa', 75, 'svc-liv', 900, 700],
  ['services/office.jpg', 'office,workspace,interior', 76, 'svc-off', 900, 700],
  ['projects/p1.jpg', 'apartment,interior', 81, 'pr1', 800, 1000],
  ['projects/p2.jpg', 'office,modern', 82, 'pr2', 800, 1000],
  ['projects/p3.jpg', 'kitchen,modular', 83, 'pr3', 800, 1000],
  ['projects/p4.jpg', 'bedroom,luxury', 84, 'pr4', 800, 1000],
  ['projects/p5.jpg', 'living-room,penthouse', 85, 'pr5', 800, 1000],
  ['projects/p6.jpg', 'cafe,interior', 86, 'pr6', 800, 1000],
  ['projects/p7.jpg', 'kitchen,island', 87, 'pr7', 800, 1000],
  ['projects/p8.jpg', 'kids,bedroom', 88, 'pr8', 800, 1000],
  ['projects/p9.jpg', 'villa,interior', 89, 'pr9', 800, 1000],
  ['blog/b1.jpg', 'kitchen,modern', 91, 'bl1', 900, 700],
  ['blog/b2.jpg', 'small,apartment,interior', 92, 'bl2', 900, 700],
  ['blog/b3.jpg', 'interior,design,studio', 93, 'bl3', 900, 700],
]

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return Buffer.from(await res.arrayBuffer())
}

async function download(out, kw, lock, seed, w, h) {
  const full = path.join(OUT, out)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  let buf
  try {
    buf = await get(`https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`)
    if (buf.length < 3000) throw new Error('too small')
  } catch {
    buf = await get(`https://picsum.photos/seed/${seed}/${w}/${h}`)
  }
  fs.writeFileSync(full, buf)
  console.log(`✓ ${out.padEnd(26)} ${(buf.length / 1024).toFixed(0)} KB`)
}

console.log('Downloading photos into public/images/ …\n')
let ok = 0
for (const t of targets) {
  try { await download(...t); ok++ }
  catch (e) { console.log(`✗ ${t[0]} — ${e.message} (gradient will show)`) }
}
console.log(`\nDone: ${ok}/${targets.length} images saved. Refresh the site to see them.`)
