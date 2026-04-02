import { defineConfig, devices } from '@playwright/experimental-ct-react'

export default defineConfig({
  testDir: './',
  testMatch: '**\/*.playwright.tsx',
  timeout: 10_000,
  fullyParallel: true,
  use: {
    ctPort: 3100,
    actionTimeout: 2_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
