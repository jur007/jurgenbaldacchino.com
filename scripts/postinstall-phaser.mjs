import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const token =
  process.env.JURGENBALDACCHINO_PHASER_READ_TOKEN ||
  process.env.GITHUB_TOKEN ||
  process.env.PHASER_READ_TOKEN ||
  process.env.TOKEN

const targetDir = path.resolve("node_modules/@jurgenbaldacchino/phaser-showcase")
const gamesDir = path.join(targetDir, "games")

const repoUrl = token
  ? `https://${token}@github.com/jur007/phaser-games.git`
  : "https://github.com/jur007/phaser-games.git"

// If games directory is missing (e.g. npm omitted files due to "files": ["dist"]), fetch full dist bundle
if (!fs.existsSync(gamesDir)) {
  try {
    console.log("[postinstall-phaser] Fetching complete phaser-showcase dist bundle...")
    fs.rmSync(targetDir, { recursive: true, force: true })
    execSync(`git clone --depth 1 -b dist "${repoUrl}" "${targetDir}"`, {
      stdio: "inherit",
    })
  } catch (err) {
    console.warn("[postinstall-phaser] Warning: could not clone phaser-showcase dist:", err.message)
  }
}

// Copy game assets to public
try {
  const assetsSource = path.join(targetDir, "assets/games")
  const assetsDest = path.resolve("public/assets/games")
  if (fs.existsSync(assetsSource)) {
    fs.mkdirSync(assetsDest, { recursive: true })
    fs.cpSync(assetsSource, assetsDest, { recursive: true })
  }
} catch (err) {
  console.warn("[postinstall-phaser] Warning: could not copy game assets:", err.message)
}
