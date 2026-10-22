import { createContext } from 'react'

/**
 * Contexto das notificações (Context API).
 * Guarda as funções showToast e dismissToast para que QUALQUER componente
 * dentro do <ToastProvider> possa mostrar um toast, sem receber isso por props.
 *
 * O valor começa como null; o hook useToast avisa se alguém tentar usar
 * o contexto fora do provider.
 */
export const ToastContext = createContext(null)
