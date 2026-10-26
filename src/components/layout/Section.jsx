import styles from './Section.module.css'

function Section({ id, title, description, children }) {
  const titleId = `${id}-title`

  return (
    <section id={id} aria-labelledby={titleId} className={styles.section}>
      <div className="container">
        <header className={styles.heading}>
          <h2 id={titleId}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

export default Section
