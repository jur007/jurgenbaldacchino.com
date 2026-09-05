import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        about: fileURLToPath(new URL("./about/index.html", import.meta.url)),
        showcase: fileURLToPath(new URL("./showcase/index.html", import.meta.url)),
        notFound: fileURLToPath(new URL("./404.html", import.meta.url)),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/", import.meta.url))}$1`,
      },
      {
        find: /^@components\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/components/", import.meta.url))}$1`,
      },
      {
        find: /^@pages\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/pages/", import.meta.url))}$1`,
      },
      {
        find: /^@styles\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/styles/", import.meta.url))}$1`,
      },
      {
        find: /^@data\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/data/", import.meta.url))}$1`,
      },
      {
        find: /^@types\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/types/", import.meta.url))}$1`,
      },
      {
        find: /^@utils\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./src/utils/", import.meta.url))}$1`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/minescrypt$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/games/minescrypt/index.js", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/mines\/vanilla$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/games/mines/vanilla/index.js", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/mines\/crypt$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/games/mines/crypt/index.js", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/mines$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/games/mines/index.js", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/plinko$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/games/plinko/index.js", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/plinko\/vanilla$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/games/plinko/vanilla/index.js", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/dist\/phaser-showcase\.css$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/phaser-showcase.css", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/phaser-showcase\.css$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/phaser-showcase.css", import.meta.url))}`,
      },
      {
        find: /^@jurgenbaldacchino\/phaser-showcase\/(.*)$/,
        replacement: `${fileURLToPath(new URL("./node_modules/@jurgenbaldacchino/phaser-showcase/", import.meta.url))}$1`,
      },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "**/*.d.ts",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/index.ts",
        "src/**/index.tsx",
        "src/**/vite-env.d.ts",
        "src/**/generated/**",
      ],
      reporter: ["text", "html", "json-summary"],
    },
  },
})
