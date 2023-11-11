import {Container} from '@mui/material'
import 'github-markdown-css'
import {ReactNode} from 'react'

export default function MdxWrapper({children}: {children?: ReactNode}) {
  return (
    <Container component="main" maxWidth="md">
      <div className="markdown-body">{children}</div>
    </Container>
  )
}
