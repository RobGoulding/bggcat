/**
 * Lists all games that are missing cover art images.
 *
 * Usage: node scripts/list-missing-images.js
 *
 * To add images:
 * 1. Visit the BGG URL for each game listed below
 * 2. Right-click the cover art image → "Save image as..."
 * 3. Save to public/images/ using the filename shown (e.g. "7-wonders-duel.jpg")
 * 4. Update the "image" field in public/games.json to match the filename
 *
 * Supported formats: .jpg, .png, .webp
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const gamesPath = join(__dirname, '..', 'public', 'games.json')
const imagesDir = join(__dirname, '..', 'public', 'images')

const games = JSON.parse(readFileSync(gamesPath, 'utf-8'))

const missing = []
const present = []

for (const game of games) {
  if (game.image) {
    const imagePath = join(imagesDir, game.image)
    if (existsSync(imagePath)) {
      present.push(game)
    } else {
      missing.push({ ...game, reason: `image field set to "${game.image}" but file not found` })
    }
  } else {
    missing.push({ ...game, reason: 'no image field' })
  }
}

console.log(`\n=== Cover Art Status ===\n`)
console.log(`Total games: ${games.length}`)
console.log(`With images: ${present.length}`)
console.log(`Missing:     ${missing.length}\n`)

if (missing.length > 0) {
  console.log(`--- Games needing images ---\n`)
  for (const game of missing) {
    console.log(`  ${game.name}`)
    console.log(`    Suggested filename: ${game.id}.jpg`)
    console.log(`    BGG page: ${game.bggUrl || 'N/A'}`)
    console.log()
  }
  console.log(`Save images to: public/images/`)
  console.log(`Then update each game's "image" field in public/games.json\n`)
}
