import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import type { BrowserCommand } from 'vitest/node'

const mockResponse: BrowserCommand<[path: string, { status?: number; json?: unknown }]> = async (
  { page, provider },
  path,
  options,
) => {
  if (provider.name === 'playwright') {
    await page.route(path, async (route) => {
      await route.fulfill({ json: options.json, status: options.status })
    })
    return
  }

  throw new Error(`provider ${provider.name} is not supported`)
}

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['vitestSetup.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        actionTimeout: 2_000,
      }),
      instances: [{ browser: 'chromium' }],
      commands: {
        mockResponse,
      },
    },
  },
})
