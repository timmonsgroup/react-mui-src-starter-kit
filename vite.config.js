import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { checker } from 'vite-plugin-checker';
//needed for node polyfills (in our case, we needed to use fs)
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Default ports - can mod this to pull from .env if needed
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const backend_port = process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 3001;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    // run the server on a specified port
    port,
    hmr: {
      // use the same port as the server
      host: 'localhost',
      port: 8000,
    },
    // proxy the /api requests to a local the backend
    proxy: {
      '/api': {
        // use any target you want for playing around with api calls
        target: `https://localhost:${backend_port}`,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // Use the modern scss api
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      }
    }
  },
  // some node_modules have not updated to esm and throw warnings in a build
  // Use this to suppress those warnings
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  },
  resolve: {
    // alias the src directory for easy imports
    // '../../../components/MyThing' becomes '@components/MyThing'
    // This project is in typescript, so make sure to update the tsconfig as well
    alias: [
      { find: '@assets', replacement: '/src/assets' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@configs', replacement: '/src/configs' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@app', replacement: '/src/app' },
      { find: '@features', replacement: '/src/features' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@helpers', replacement: '/src/helpers' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@services', replacement: '/src/services' },
      { find: '@models', replacement: '/src/models' },
      { find: '@root', replacement: '/src/' },
    ],
  },
  plugins: [
    // Plugins to handle https (plus the cert)
    mkcert(),
    // Need that react plugin
    react(),
    // Allow node polyfills for the browser (needed for many libraries implementing uploading / processing of files)
    nodePolyfills({
      include: ["path", "stream", "util"],
      exclude: ["http"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      overrides: {
        fs: "memfs",
      },
      protocolImports: true,
    }),
    // Plugins to check typescript WHILE you develop
    checker({
      typescript: true
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup.js'
  }
})