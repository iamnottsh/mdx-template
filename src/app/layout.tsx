'use client'
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material'
import {ReactNode, useMemo} from 'react'

export default function RootLayout({children}: {
  children?: ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({palette: {mode: prefersDarkMode ? 'dark' : 'light'}}), [prefersDarkMode])
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
