import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(), 
    sentryVitePlugin({
      org: "nest-x7",
      project: "javascript-react"
    })
  ],

  build: {
    sourcemap: false,  // Disable sourcemaps in production for performance
    chunkSizeWarningLimit: 500,  // Warn when chunks exceed this size

    // Optimize chunking strategy to minimize chunk size and improve load performance
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
        // Preload important files to speed up initial load
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },

  // Improve dev server performance
  server: {
    hmr: true,  // Enable Hot Module Replacement (HMR)
    open: true,  // Automatically open the app in the browser
    cors: true,  // Allow cross-origin requests for local development
    watch: {
      usePolling: false  // Improve watch performance during development
    }
  },

  // Enable caching for faster rebuilds
  cache: {
    type: 'filesystem'  // Use filesystem cache to speed up rebuilds
  },

  // Minify output for smaller file sizes
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',  // Use modern ES syntax for better performance
      minify: true  // Enable minification of dependencies
    }
  }
});
