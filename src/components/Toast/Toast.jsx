import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

const TOAST_TYPES = {
  success: { srLabel: 'Sucesso', icon: 'M4 10.5l4 4 8-9' },
  error: { srLabel: 'Erro', icon: 'M6 6l8 8M14 6l-8 8' },
  warning: { srLabel: 'Atenção', icon: 'M10 5v6M10 14.5v.5' },
  info: { srLabel: 'Informação', icon: 'M10 9v6M10 5.5v.5' },
}

function Toast({ id, type = 'info', message, duration = 5000, onClose }) {
  const [isPaused, setIsPaused] = useState(false)
  const typeConfig = TOAST_TYPES[type] ?? TOAST_TYPES.info

  useEffect(() => {
    if (isPaused) return

    const timerId = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timerId)
  }, [isPaused, duration, onClose, id])

  return (
    <div
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
