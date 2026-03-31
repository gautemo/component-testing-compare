declare module 'vitest/browser' {
  interface BrowserCommands {
    mockResponse: (path: string, json: unknown) => Promise<void>
  }
}

export {}
