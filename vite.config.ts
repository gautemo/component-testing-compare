import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function stripLegacyCypressOptimizeDepsPlugin(): Plugin {
  return {
    name: 'cypress-vite8-compat',
    config(config) {
      if (config?.optimizeDeps?.esbuildOptions) {
        delete config.optimizeDeps.esbuildOptions
      }
    },
  }
}

// dependencies that need to be the same instance between support file and test
const CYPRESS_DEDUPE_DEPS = ['react', 'react-dom']

// whatever triggers rebuilds due to the new optimized dependencies found
const CYPRESS_PREBUNDLE_DEPS = ['@tanstack/react-query', 'antd', 'cypress/react', 'valtio']

export default defineConfig({
  plugins: [react(), stripLegacyCypressOptimizeDepsPlugin()],
  resolve: {
    dedupe: CYPRESS_DEDUPE_DEPS,
  },
  optimizeDeps: {
    include: CYPRESS_PREBUNDLE_DEPS,
  },
})
