// QR generator for mission pages
// Usage:
//  BASE_URL=https://your.domain FORMAT=png npm run qrs
//  BASE_URL=http://localhost:5173 FORMAT=svg QR_SIZE=384 QR_MARGIN=2 npm run qrs

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
const FORMAT = (process.env.FORMAT || 'png').toLowerCase() // png | svg
const SIZE = Number(process.env.QR_SIZE || 512)
const MARGIN = Number(process.env.QR_MARGIN || 2)
const ECL = process.env.QR_ECL || 'Q' // L | M | Q | H

// 001~015까지 만들도록 하드코딩 되어있음
const defaultIds = Array.from({ length: 15 }, (_, i) => `CD-${String(i + 1).padStart(3, '0')}`)
const cliIds = process.argv.slice(2).filter(Boolean)
const cardIds = cliIds.length ? cliIds : defaultIds

const outDir = path.resolve(__dirname, '..', 'public', 'qrcodes')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function buildUrl(cardId) {
  // Clean URL for BrowserRouter with Netlify redirects
  return `${BASE_URL}/cards/${cardId}?v=1`
}

async function generateOne(cardId) {
  const url = buildUrl(cardId)
  const fileBase = path.join(outDir, `${cardId}`)
  const options = { width: SIZE, margin: MARGIN, errorCorrectionLevel: ECL }

  if (FORMAT === 'png') {
    const file = `${fileBase}.png`
    await QRCode.toFile(file, url, options)
    return { cardId, url, file: path.basename(file), format: 'png' }
  }

  if (FORMAT === 'svg') {
    const file = `${fileBase}.svg`
    const svg = await QRCode.toString(url, { type: 'svg', margin: MARGIN, errorCorrectionLevel: ECL })
    await fs.writeFile(file, svg, 'utf8')
    return { cardId, url, file: path.basename(file), format: 'svg' }
  }

  throw new Error(`Unsupported FORMAT: ${FORMAT}`)
}

async function generateIndex(manifest) {
  const rows = manifest
    .map(
      (m) => `
      <figure class="item">
        <img src="./${m.file}" alt="QR ${m.cardId}" />
        <figcaption>
          <div class="title">${m.cardId.toUpperCase()}</div>
          <div class="url">${m.url}</div>
        </figcaption>
      </figure>`,
    )
    .join('\n')

  const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>QR Codes</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; }
      h1 { margin: 0 0 16px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
      .item { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
      img { width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: contain; }
      .title { font-weight: 700; }
      .url { color: #6b7280; font-size: 12px; word-break: break-all; }
      @media print { .url { display: none; } }
    </style>
  </head>
  <body>
    <h1>QR Codes (${manifest.length}) — ${FORMAT.toUpperCase()}</h1>
    <div class="grid">
      ${rows}
    </div>
  </body>
  </html>`

  await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')
}

async function main() {
  await ensureDir(outDir)
  const manifest = []
  for (const id of cardIds) {
    const entry = await generateOne(id)
    manifest.push(entry)
    console.log(`✔ ${entry.cardId} -> ${entry.file}`)
  }
  await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8')
  await generateIndex(manifest)
  console.log(`\nDone. Open: public/qrcodes/index.html`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
