import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const token =
  process.env.JURGENBALDACCHINO_PHASER_READ_TOKEN ||
  process.env.GITHUB_TOKEN ||
  process.env.PHASER_READ_TOKEN ||
  process.env.TOKEN

const repoUrl = token
  ? `https://${token}@github.com/jur007/phaser-games.git`
  : "https://github.com/jur007/phaser-games.git"

const targetDir = path.resolve("node_modules/@jurgenbaldacchino/phaser-showcase")

console.log("[update-games] Fetching latest dist from phaser-games...")

if (fs.existsSync(path.join(targetDir, ".git"))) {
  execSync(`git -C "${targetDir}" fetch origin dist`, { stdio: "inherit" })
  execSync(`git -C "${targetDir}" reset --hard origin/dist`, { stdio: "inherit" })
} else {
  fs.rmSync(targetDir, { recursive: true, force: true })
  execSync(`git clone --depth 1 -b dist "${repoUrl}" "${targetDir}"`, {
    stdio: "inherit",
  })
}

// Get the resolved commit SHA
let commitSha = ""
try {
  commitSha = execSync(`git -C "${targetDir}" rev-parse HEAD`, {
    encoding: "utf8",
  }).trim()
  console.log(`[update-games] Latest dist commit: ${commitSha}`)
} catch {
  // Ignored
}

// Update package-lock.json if commitSha found
if (commitSha) {
  const lockfilePath = path.resolve("package-lock.json")
  if (fs.existsSync(lockfilePath)) {
    try {
      const lockData = JSON.parse(fs.readFileSync(lockfilePath, "utf8"))
      const depKey = "node_modules/@jurgenbaldacchino/phaser-showcase"
      if (lockData.packages && lockData.packages[depKey]) {
        lockData.packages[depKey].resolved =
          `git+https://github.com/jur007/phaser-games.git#${commitSha}`
        fs.writeFileSync(lockfilePath, JSON.stringify(lockData, null, 2) + "\n")
        console.log(`[update-games] Updated package-lock.json resolved commit to ${commitSha}`)
      }
    } catch (err) {
      console.warn("[update-games] Warning: could not update package-lock.json:", err.message)
    }
  }
}

// Run postinstall to sync assets
execSync("node scripts/postinstall-phaser.mjs", { stdio: "inherit" })
console.log("[update-games] Phaser games updated successfully.")
