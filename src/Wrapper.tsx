'use client'

import {NavigatorContext} from '@/Navigator'
import {Box, Container, Divider, List, ListItemButton, ListItemText} from '@mui/material'
import {join} from 'path'
import {ReactNode, useState} from 'react'

const width = 240

export default function Wrapper({children}: {
  children?: ReactNode
}) {
  const [value, setValue] = useState<Record<string, string>>()
  return (
    <>
      <Box component="nav" position="fixed" top={0} left={0} height="100%" overflow="auto" width={{xs: 0, xl: width}}>
        <List>
          <ListItemButton component="a" href=".">
            <ListItemText primary="↑"/>
          </ListItemButton>
          <Divider/>
          {value && Object.entries(value).map(([key, name]) =>
            <ListItemButton key={key} component="a" href={join(location.pathname, key)}>
              <ListItemText primary={name}/>
            </ListItemButton>)}
        </List>
      </Box>
      <Box component="main" position="fixed" top={0} left={{xs: 0, xl: width}} width={{xs: '100%', xl: `calc(100% - ${width}px)`}}>
        <Container maxWidth="md">
          <NavigatorContext.Provider value={setValue}>{children}</NavigatorContext.Provider>
        </Container>
      </Box>
    </>
  )
}
