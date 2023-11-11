import {DispatchWithoutAction, useCallback, useState} from 'react'

export default function useOpen(): [boolean, DispatchWithoutAction, DispatchWithoutAction] {
  const [open, setOpen] = useState(false)
  return [open, useCallback(() => setOpen(true), []), useCallback(() => setOpen(false), [])]
}
