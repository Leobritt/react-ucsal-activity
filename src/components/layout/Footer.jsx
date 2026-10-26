import styles from './Footer.module.css'

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
