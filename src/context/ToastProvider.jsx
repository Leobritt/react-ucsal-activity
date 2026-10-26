import { useCallback, useMemo, useRef, useState } from 'react'
import ToastContainer from '../components/Toast/ToastContainer.jsx'
import { ToastContext } from './ToastContext.js'

const MAX_VISIBLE_TOASTS = 4

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const nextToastId = useRef(1)

  const showToast = useCallback(({ type = 'info', message, duration }) => {
    const id = nextToastId.current++
    setToasts((current) => [...current, { id, type, message, duration }].slice(-MAX_VISIBLE_TOASTS))
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const contextValue = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext>
  )
}

export default ToastProvider
