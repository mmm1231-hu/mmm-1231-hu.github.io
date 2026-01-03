import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { compression } from 'vite-plugin-compression2';
import { visualizer } from "rollup-plugin-visualizer";

const plugins = [
  react(),
  tailwindcss(),
  vitePluginManusRuntime(),
  compression({ algorithms: ['gzip', 'brotliCompress'] }),
  visualizer({
    open: false,
    gzipSize: true,
    brotliSize: true,
    filename: "dist/stats.html",
  }),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "../shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: import.meta.dirname,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/"),
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Sometimes becuase of hard optimization by Vite, this configuration is broken on production
        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
        //       return "react-vendor";
        //     }
        //     if (id.includes("framer-motion")) {
        //       return "framer-motion";
        //     }
        //     if (id.includes("recharts")) {
        //       return "recharts";
        //     }
        //     if (id.includes("@radix-ui") || id.includes("lucide-react")) {
        //       return "ui-vendor";
        //     }
        //     return "vendor";
        //   }
        // },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
