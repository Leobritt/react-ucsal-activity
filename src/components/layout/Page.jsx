import styles from './Page.module.css'

/**
 * Estrutura padrão de uma página: trilha de navegação (opcional),
 * título principal (h1), descrição e conteúdo.
 *
 * Props:
 *  - title: título da página (h1). Opcional: a página de produto usa o nome do produto como h1
 *  - description: texto curto abaixo do título (opcional)
 *  - breadcrumb: trilha de navegação exibida acima do título (opcional)
 *  - children: conteúdo da página
 */
function Page({ title, description, breadcrumb, children }) {
  return (
    <div className={styles.page}>
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
