'use client'

import {AppBar, Box, createTheme, CssBaseline, Tab, Tabs, ThemeProvider, Toolbar, Typography, useMediaQuery} from '@mui/material'
import {ReactNode, useEffect, useMemo, useState} from 'react'
import {metadata} from './page'
import * as tabs from './tabs'

export default function Layout({children}: {
  children?: ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({palette: {mode: prefersDarkMode ? 'dark' : 'light'}}), [prefersDarkMode])
  const [height, setHeight] = useState<number>()
  const h = useMemo(() => height ?? 0, [height])
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  const current = useMemo(() => isClient ? location.pathname?.split('/')[1] : undefined, [isClient])
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar color="inherit" ref={current => setHeight(current?.offsetHeight)}>
            <Toolbar>
              <Tabs value={isClient && current !== undefined && current in tabs ? current : 0}>
                <Tab label={
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {metadata.title}
                  </Typography>
                }/>
                {Object.entries(tabs).map(([key, name]) => <Tab key={key} value={key} component="a" href={`/${key}`} label={name}/>)}
              </Tabs>
            </Toolbar>
          </AppBar>
          <Toolbar/>
          <Box my={1} sx={{'& :target:before': {display: 'block', content: '" "', height: `${h}px`, marginTop: `${-h}px`, visibility: 'hidden'}}}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
