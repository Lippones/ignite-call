'use client'
import { QueryClient, QueryClientProvider } from 'react-query'

interface ReactQueryProviderProps {
  children: React.ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
