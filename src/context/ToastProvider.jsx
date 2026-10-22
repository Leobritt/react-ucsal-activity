import { useCallback, useMemo, useRef, useState } from 'react'
import ToastContainer from '../components/Toast/ToastContainer.jsx'
import { ToastContext } from './ToastContext.js'

// Quantos toasts podem aparecer ao mesmo tempo
const MAX_VISIBLE_TOASTS = 4

/**
 * Provider das notificações: é o "dono" do state global dos toasts.
 * Envolve a aplicação (ver main.jsx) e desenha a área de notificações uma única vez.
 *
 * Qualquer componente lá dentro pode chamar:
 *   const { showToast } = useToast()
 *   showToast({ type: 'success', message: 'Pronto!' })
 */
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Contador de ids: useRef porque mudar o número não precisa redesenhar a tela
  const nextToastId = useRef(1)

  // useCallback mantém as MESMAS funções entre renderizações. Elas são
  // dependências de useEffect em outros componentes (Toast, ExchangeRequest);
  // se mudassem a cada renderização, esses efeitos rodariam de novo à toa.
  const showToast = useCallback(({ type = 'info', message, duration }) => {
    const id = nextToastId.current++
    setToasts((current) => [...current, { id, type, message, duration }].slice(-MAX_VISIBLE_TOASTS))
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  // useMemo: o objeto do contexto só é recriado se as funções mudarem.
  // Um objeto novo a cada renderização faria todos os consumidores renderizarem de novo.
  const contextValue = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    // No React 19, o próprio contexto funciona como provider
    // (em versões antigas, escrevia-se <ToastContext.Provider value={...}>).
    <ToastContext value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext>
  )
}

export default ToastProvider
