import { afterEach } from 'vitest'
import { queryClient } from './src/AppProvider'

afterEach(() => {
  queryClient.clear()
})

declare module 'vitest/browser' {
  interface BrowserCommands {
    mockResponse: (path: string, options: { status?: number; json?: unknown }) => Promise<void>
  }
}
