import { createContext } from 'react'

export type ToastType = 'info' | 'success' | 'error'

export const ToastContext = createContext<{ show: (message: string, type?: ToastType) => void }>({
  show: () => {},
})

