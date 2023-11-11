'use client'

import {createContext, Dispatch, useContext, useEffect} from 'react'

export const NavigatorContext = createContext<Dispatch<Record<string, string> | undefined> | null>(null)

export default function Navigator({children}: {
  children: Record<string, string>
}) {
  const context = useContext(NavigatorContext)
  useEffect(() => {
    if (!context) return
    context(children)
    return () => context(undefined)
  }, [context, children])
  return null
}
