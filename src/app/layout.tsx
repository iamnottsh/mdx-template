'use client'

import {EndContext, StartContext} from '@/Wrapper'
import {AppBar, Box, createTheme, CssBaseline, Tab, Tabs, ThemeProvider, Toolbar, useMediaQuery} from '@mui/material'
import {ReactNode, useEffect, useMemo, useState} from 'react'
import tabs from './tabs'

const site = '有效流'

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
  const [start, setStart] = useState<ReactNode>()
  const [end, setEnd] = useState<ReactNode>()
  return (
    <html lang="zh-CN">
      <head>
        <title>{site}</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar color="inherit" ref={current => setHeight(current?.offsetHeight)}>
            <Toolbar>
              {start}
              <Tabs
                value={isClient && current !== undefined && current in tabs ? current : 0}
                sx={{flexGrow: 1}}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab component="a" href="/" label={site} sx={{fontSize: '1.125rem'}}/>
                {Object.entries(tabs).map(([key, name]) => <Tab key={key} value={key} component="a" href={`/${key}`} label={name}/>)}
              </Tabs>
              {end}
            </Toolbar>
          </AppBar>
          <Toolbar/>
          <Box my={1} sx={{'& :target:before': {display: 'block', content: '" "', height: `${h}px`, marginTop: `${-h}px`, visibility: 'hidden'}}}>
            <StartContext.Provider value={setStart}>
              <EndContext.Provider value={setEnd}>
                {children}
              </EndContext.Provider>
            </StartContext.Provider>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
