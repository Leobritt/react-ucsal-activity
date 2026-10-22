import Toast from './Toast.jsx'
import styles from './Toast.module.css'

/**
 * Área fixa da tela onde as notificações aparecem empilhadas.
 * Fica sempre no HTML (mesmo vazia): leitores de tela só anunciam
 * mudanças em regiões "aria-live" que já existiam antes da mensagem chegar.
 *
 * Props:
 *  - toasts: lista de { id, type, message, duration? }
 *  - onDismiss: função chamada com o id do toast que deve sair
 *
 * Importante: onDismiss deve ser uma função estável (useCallback no pai).
 * Se ela mudasse a cada renderização, o timer de cada toast recomeçaria
 * toda vez que um novo toast aparecesse.
 */
function ToastContainer({ toasts, onDismiss }) {
  return (
    <section className={styles.container} aria-label="Notificações" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={onDismiss}
        />
      ))}
    </section>
  )
}

export default ToastContainer
