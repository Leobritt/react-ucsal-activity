import Toast from './Toast.jsx'
import styles from './Toast.module.css'

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
