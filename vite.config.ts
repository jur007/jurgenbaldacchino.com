import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, fileURLToPath(new URL(".", import.meta.url)), "")

  if (mode !== "test" && !environment.VITE_TURNSTILE_SITE_KEY) {
    throw new Error("VITE_TURNSTILE_SITE_KEY must be configured")
  }

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          home: fileURLToPath(new URL("./index.html", import.meta.url)),
          about: fileURLToPath(new URL("./about/index.html", import.meta.url)),
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
  }
})
