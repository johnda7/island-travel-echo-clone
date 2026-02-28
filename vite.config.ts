import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",  // Кастомный домен phuketgo.com - всегда используем корень
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'leaflet': ['leaflet', 'react-leaflet'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-tooltip'],
          'charts': ['recharts'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react'],
          'dates': ['date-fns'],
        }
      }
    }
  },
}));
