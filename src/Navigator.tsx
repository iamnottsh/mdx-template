'use client'

import {createContext, useContext, useEffect} from 'react'

export const NavigatorContext = createContext<((value: Record<string, string> | undefined) => void) | null>(null)

export default function Navigator({children}: {
  children: Record<string, string>
}) {
  const context = useContext(NavigatorContext)
  useEffect(() => {
    if (context) {
      context(children)
      return () => context(undefined)
    }
  }, [context, children])
  return null
}
