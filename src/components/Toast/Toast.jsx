import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

// Texto lido pelo leitor de tela antes da mensagem e ícone de cada tipo
const TOAST_TYPES = {
  success: { srLabel: 'Sucesso', icon: 'M4 10.5l4 4 8-9' },
  error: { srLabel: 'Erro', icon: 'M6 6l8 8M14 6l-8 8' },
  warning: { srLabel: 'Atenção', icon: 'M10 5v6M10 14.5v.5' },
  info: { srLabel: 'Informação', icon: 'M10 9v6M10 5.5v.5' },
}

/**
 * NOTIFICAÇÃO TOAST
 * Mensagem curta de feedback que some sozinha depois de alguns segundos
 * ou quando o usuário clica em "Fechar".
 *
 * Props:
 *  - id: identificador do toast (devolvido no onClose)
 *  - type: 'success' | 'error' | 'warning' | 'info'
 *  - message: texto da notificação
 *  - duration: tempo na tela em milissegundos (padrão: 5000)
 *  - onClose: função chamada com o id quando a notificação deve sair da tela
 *
 * Com o mouse em cima (ou foco no botão Fechar), o tempo pausa,
 * para dar tempo de ler. Isso atende a recomendação de acessibilidade
 * de permitir que o usuário controle limites de tempo.
 */
function Toast({ id, type = 'info', message, duration = 5000, onClose }) {
  const [isPaused, setIsPaused] = useState(false)
  const typeConfig = TOAST_TYPES[type] ?? TOAST_TYPES.info

  // Timer de fechamento automático. Recomeça quando a pausa termina.
  // A função de limpeza cancela o timer se o toast for fechado antes
  // ou se o usuário pausar — sem ela, o onClose poderia rodar depois.
  useEffect(() => {
    if (isPaused) return

    const timerId = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timerId)
  }, [isPaused, duration, onClose, id])

  return (
    <div
      // Erros usam role="alert" (anúncio imediato). Os demais são anunciados
      // pela área de notificações, que tem aria-live="polite" (ver ToastContainer).
      role={type === 'error' ? 'alert' : undefined}
      className={styles.toast}
      data-type={type}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path d={typeConfig.icon} />
        </svg>
      </span>

      <p className={styles.message}>
        <span className="visually-hidden">{typeConfig.srLabel}: </span>
        {message}
      </p>

      <button type="button" className={styles.close} onClick={() => onClose(id)} aria-label="Fechar notificação">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 6l8 8M14 6l-8 8" />
        </svg>
      </button>
    </div>
  )
}

export default Toast
