import { defineConfig } from 'cypress'
import { mergeConfig, type Plugin } from 'vite'
import viteConfig from './vite.config'

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
const CYPRESS_PREBUNDLE_DEPS = [
  '@tanstack/react-query',
  'antd',
  'cypress/react',
  'valtio',
  '@ant-design/icons',
  'ohash',
  'antd/es/input/Search',
]

/*
    "@neoconfetti/react": "^1.0.0",
*/

export default defineConfig({
  allowCypressEnv: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: mergeConfig(viteConfig, {
        plugins: [stripLegacyCypressOptimizeDepsPlugin()],
        resolve: {
          dedupe: CYPRESS_DEDUPE_DEPS,
        },
        optimizeDeps: {
          include: CYPRESS_PREBUNDLE_DEPS,
        },
      }),
    },
  },
})
