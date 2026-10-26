import styles from './Page.module.css'

function Page({ title, description, breadcrumb, documentTitle = title, children }) {
  return (
    <div className={styles.page}>
      <title>{`${documentTitle} | Circuito`}</title>
      <div className="container">
        {breadcrumb}
        {title && (
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}
        {children}
      </div>
    </div>
  )
}

export default Page
