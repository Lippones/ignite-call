'use client'
import { globalStyles } from '@/styles/global'

interface GlobalThemeProviderProps {
  children: React.ReactNode
}

export function GlobalThemeProvider({ children }: GlobalThemeProviderProps) {
  globalStyles()
  return <main>{children}</main>
}
