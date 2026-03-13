/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/CourseProjectReactWeb/",
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