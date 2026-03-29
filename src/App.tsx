import { QueryClientProvider } from '@tanstack/react-query'
import { Form } from './Form'
import { queryClient } from './query'

export function App() {
  return (
    <>
      <header>
        <h1>Car insurance for you</h1>
      </header>
      <main>
        <QueryClientProvider client={queryClient}>
          <Form />
        </QueryClientProvider>
      </main>
      <footer>
        <p>If you need help, call us!</p>
      </footer>
    </>
  )
}
