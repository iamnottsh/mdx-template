import Wrapper from '@/Wrapper'
import {Box} from '@mui/material'
import 'github-markdown-css'
import {MDXComponents} from 'mdx/types'
import {ReactNode} from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({children}: {children?: ReactNode}) => {
      const body = <div className="markdown-body">{children}</div>
      return (
        <>
          <Box display="none" displayPrint="block">{body}</Box>
          <Box display="block" displayPrint="none"><Wrapper>{body}</Wrapper></Box>
        </>
      )
    },
  }
}