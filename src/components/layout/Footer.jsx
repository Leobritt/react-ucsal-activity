import styles from './Footer.module.css'

/**
 * Rodapé da página. Componente simples, sem state:
 * só recebe o texto do crédito via props.
 */
function Footer({ credit }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>Circuito</p>
        <p className={styles.credit}>{credit}</p>
      </div>
    </footer>
  )
}

export default Footer
