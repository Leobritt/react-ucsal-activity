import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext.js'

/**
 * Hook personalizado para mostrar notificações de qualquer componente.
 *
 * Uso:
 *   const { showToast } = useToast()
 *   showToast({ type: 'error', message: 'Não foi possível salvar.' })
 */
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    // Erro claro durante o desenvolvimento, em vez de "undefined is not a function"
    throw new Error('useToast precisa ser usado dentro de <ToastProvider>.')
  }

  return context
}
