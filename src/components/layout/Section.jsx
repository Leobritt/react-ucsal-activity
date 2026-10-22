import styles from './Section.module.css'

/**
 * Bloco de conteúdo da página, com título e descrição opcional.
 * Usa <section> com aria-labelledby, assim leitores de tela anunciam
 * a seção pelo nome do seu título.
 *
 * Props:
 *  - id: âncora usada pelo menu (ex.: "produtos")
 *  - title: título da seção (h2)
 *  - description: texto curto abaixo do título (opcional)
 *  - children: conteúdo da seção
 */
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
