'use client'

import {NavigatorContext} from '@/Navigator'
import {Box, Container, Divider, List, ListItemButton, ListItemText, Toolbar} from '@mui/material'
import BananaSlug from 'github-slugger'
import {join} from 'path'
import {ReactNode, useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-use'

const navWidth = 280
const footerWidth = 240

export default function Wrapper({children}: {
  children?: ReactNode
}) {
  const [value, setValue] = useState<Record<string, string>>()
  const [toc, setToc] = useState<[string, string, number][]>()
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const {current} = ref
    if (!current) return
    const slugger = new BananaSlug()
    setToc(Array.from(current.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(value => {
      const title = value.textContent ?? '', id = slugger.slug(title)
      value.id = id
      return [title, id, Number(value.tagName.substring(1))]
    }))
  }, [])
  const {hash} = useLocation()
  return (
    <Box
      position="absolute"
      left={{xs: 0, xl: navWidth}}
      width={{xs: '100%', md: `calc(100% - ${footerWidth}px)`, xl: `calc(100% - ${navWidth + footerWidth}px)`}}
    >
      <Box
        component="nav"
        position="fixed"
        top={0}
        left={0}
        height="100%"
        overflow="auto"
        width={{xs: 0, xl: navWidth}}
      >
        <Toolbar/>
        <List>
          <ListItemButton component="a" href=".">
            <ListItemText primary="↑" primaryTypographyProps={{noWrap: true}}/>
          </ListItemButton>
          <Divider/>
          {value && Object.entries(value).map(([key, name]) =>
            <ListItemButton key={key} component="a" href={join(location.pathname, key)}>
              <ListItemText primary={name} primaryTypographyProps={{noWrap: true}}/>
            </ListItemButton>)}
        </List>
      </Box>
      <Container component="main" maxWidth="md" ref={ref}>
        <NavigatorContext.Provider value={setValue}>{children}</NavigatorContext.Provider>
      </Container>
      <Box
        component="footer"
        position="fixed"
        top={0}
        right={0}
        height="100%"
        overflow="auto"
        width={{xs: 0, md: footerWidth}}
      >
        <Toolbar/>
        <List>
          {toc?.map(([title, id, level]) =>
            <ListItemButton key={id} component="a" href={`#${id}`} selected={`#${encodeURIComponent(id)}` === hash}>
              <ListItemText primary={title} primaryTypographyProps={{noWrap: true}} sx={{pl: (level - 1) << 1}}/>
            </ListItemButton>)}
        </List>
      </Box>
    </Box>
  )
}
