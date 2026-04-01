import { defineConfig, devices } from '@playwright/experimental-ct-react'

export default defineConfig({
  testDir: './',
  testMatch: '**\/*.spec.tsx',
  timeout: 10_000,
  fullyParallel: true,
  use: {
    ctPort: 3100,
    headless: false,
    actionTimeout: 2_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
