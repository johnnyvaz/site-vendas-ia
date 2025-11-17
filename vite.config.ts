import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      port: 8080,
      host: 'localhost',
    },
    cors: true,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting configuration for optimal performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }

          // Radix UI components
          if (id.includes('@radix-ui/')) {
            return 'ui';
          }

          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }

          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform/') || id.includes('zod')) {
            return 'forms';
          }

          // Utils
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utils';
          }

          // Node modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        
        // File naming strategy
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') || 'chunk'
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        
        // Asset naming
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] || assetInfo.originalFileNames?.[0] || 'asset';

          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(fileName)) {
            return `assets/images/[name]-[hash][extname]`;
          }

          if (/\.(woff2?|eot|ttf|otf)$/.test(fileName)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    
    // Optimization settings
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console.log in production
        drop_debugger: true,
      },
    },
    
    // Source maps
    sourcemap: mode === 'development',
    
    // Chunk size limits
    chunkSizeWarningLimit: 1000, // 1MB warning
    
    // CSS code splitting
    cssCodeSplit: true,
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tooltip',
    ],
    exclude: [
      // Exclude heavy or optional dependencies from pre-bundling
    ],
  },
  
  // Preview server configuration (for production builds)
  preview: {
    port: 8080,
    host: true,
  },
  
  // ESLint and other settings
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
}));
