import MdxWrapper from '@/MdxWrapper'
import 'github-markdown-css'
import {MDXComponents} from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: MdxWrapper,
  }
}
