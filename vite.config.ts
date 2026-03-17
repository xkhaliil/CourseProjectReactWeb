/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  base: "/CourseProjectReactWeb/",
  resolve: {
    alias: {
      "#shared/store": resolve(__dirname, "src/shared/store/index.ts"),
      "#shared/useAsync": resolve(__dirname, "src/shared/useAsync/index.ts"),
      "#shared/getErrorMessage": resolve(
        __dirname,
        "src/shared/getErrorMessage/index.ts",
      ),
    },
  },
  server: {
    proxy: {
      "/r6api": {
        target: "https://api.r6data.eu",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/r6api/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    css: false,
    setupFiles: "./src/setupTests.tsx",
  },
})
