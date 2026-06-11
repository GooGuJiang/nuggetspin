import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            {
              name: 'vendor-three-core',
              test: /node_modules[\\/](three|three-stdlib)[\\/]/,
            },
            {
              name: 'vendor-r3f-fiber',
              test: /node_modules[\\/]@react-three[\\/]fiber[\\/]/,
            },
            {
              name: 'vendor-r3f-drei',
              test: /node_modules[\\/]@react-three[\\/]drei[\\/]/,
            },
            {
              name: 'vendor-r3f-postprocessing',
              test: /node_modules[\\/](@react-three[\\/]postprocessing|postprocessing)[\\/]/,
            },
            {
              name: 'vendor-three-extras',
              test: /node_modules[\\/](maath|troika-|camera-controls|meshline|stats-gl)[\\/]/,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
            },
            {
              name: 'vendor-i18n',
              test: /node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector|i18next-http-backend)[\\/]/,
            },
            {
              name: 'vendor-utils',
              test: /node_modules[\\/](axios|howler|gsap|leva|mongodb)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
