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
 *  - ref: referência ao <section> (no React 19, ref chega como uma prop comum)
 *
 * tabIndex={-1} deixa o App mover o foco para a seção via código
 * (ex.: ao clicar em "Ver detalhes"), sem colocá-la na ordem do Tab.
 */
function Section({ id, title, description, children, ref }) {
  const titleId = `${id}-title`

  return (
    <section id={id} ref={ref} tabIndex={-1} aria-labelledby={titleId} className={styles.section}>
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
