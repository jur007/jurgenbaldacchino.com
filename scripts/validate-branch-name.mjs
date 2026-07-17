#!/usr/bin/env node
import { execSync } from "node:child_process"

const protectedBranches = new Set(["main", "master", "develop", "development"])
const pattern =
  /^(feat|fix|chore|docs|refactor|test|perf|build|ci)\/[0-9]{4}-[a-z0-9]+(?:-[a-z0-9]+)*$/

let branchName = ""

try {
  branchName = execSync("git branch --show-current", { encoding: "utf8" }).trim()
} catch {
  console.error("Unable to determine the current Git branch.")
  process.exit(1)
}

if (!branchName || protectedBranches.has(branchName)) {
  process.exit(0)
}

if (!pattern.test(branchName)) {
  console.error(`Invalid branch name: ${branchName}`)
  console.error("Expected format: <type>/<number>-<description>")
  console.error("Examples:")
  console.error("  feat/0001-add-project-scaffold")
  console.error("  fix/0003-resolve-mobile-overflow")
  console.error("  chore/0004-configure-commitlint")
  process.exit(1)
}

console.log(`Branch name valid: ${branchName}`)
