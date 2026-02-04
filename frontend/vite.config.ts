import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@components': path.resolve(__dirname, './src/components'),
          '@pages': path.resolve(__dirname, './src/pages'),
          '@sections': path.resolve(__dirname, './src/sections'),
          '@types': path.resolve(__dirname, './src/types'),
          '@constants': path.resolve(__dirname, './src/constants'),
          '@assets': path.resolve(__dirname, './src/assets'),
        }
      }
      ,
      build: {
        // Raise the warning limit so you won't get noisy 500k warnings during normal dev builds.
        // Adjust this value if you want stricter checks (e.g., 500) or looser (e.g., 1000).
        chunkSizeWarningLimit: 700,
        rollupOptions: {
          output: {
            // Manual chunk splitting for large vendor libraries.
            // Keeps React-related code, Three.js, GSAP, icons, etc. in separate chunks.
            manualChunks(id: string) {
              if (id.includes('node_modules')) {
                  // Keep React/react-dom in the main vendor chunk to avoid runtime ordering issues
                  // and let Rollup handle React-related dependencies together.
                  if (id.includes('three')) return 'vendor_three';
                  if (id.includes('gsap')) return 'vendor_gsap';
                  if (id.includes('lucide-react') || id.includes('lucide')) return 'vendor_icons';
                  if (id.includes('date-fns') || id.includes('lodash')) return 'vendor_utils';
                  return 'vendor';
                }
            }
          }
        }
      }
    };
});
