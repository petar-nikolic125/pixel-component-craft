/* vite.config.ts – alias paths cleaned up & typed for ESM */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

/* helpers */
const r = (...p: string[]) => path.resolve(import.meta.dirname, ...p);

export default defineConfig({
  root: r("client"),                       // dev server starts in /client
  plugins: [
    react(),
    runtimeErrorOverlay(),

    /* Replit cartographer plug-in only in dev / repl */
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID
        ? [
          // dynamic import keeps prod bundle clean
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
        ]
        : []),
  ],

  resolve: {
    alias: {
      "@": r("client", "src"),             //  ↪  import foo from "@/…"
      "@shared": r("shared"),              //  ↪  code shared with server
      "@assets": r("attached_assets"),     //  ↪  static files outside /public
    },
  },

  build: {
    outDir: r("dist", "public"),           // final static output
    emptyOutDir: true,
  },

  /* optional: silence’ node built-in warnings for three.js */
  optimizeDeps: {
    exclude: ["three"],
  },
});
