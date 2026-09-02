import { execSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const token =
  process.env.JURGENBALDACCHINO_PHASER_READ_TOKEN ||
  process.env.GITHUB_TOKEN ||
  process.env.PHASER_READ_TOKEN ||
  process.env.TOKEN

if (token) {
  try {
    const netrcPath = path.join(os.homedir(), ".netrc")
    const netrcContent = `machine github.com\nlogin oauth2\npassword ${token}\n\nmachine api.github.com\nlogin oauth2\npassword ${token}\n`
    fs.writeFileSync(netrcPath, netrcContent, { mode: 0o600 })

    execSync(
      `git config --global url."https://${token}@github.com/".insteadOf "https://github.com/"`,
      { stdio: "ignore" },
    )
    execSync(
      `git config --global url."https://${token}@github.com/".insteadOf "ssh://git@github.com/"`,
      { stdio: "ignore" },
    )
    execSync(`git config --global url."https://${token}@github.com/".insteadOf "git@github.com:"`, {
      stdio: "ignore",
    })
  } catch (err) {
    console.warn("[setup-git-auth] Warning: could not configure git credentials:", err.message)
  }
}
