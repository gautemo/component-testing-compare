import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
