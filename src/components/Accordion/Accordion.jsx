import { useId, useState } from 'react'
import styles from './Accordion.module.css'

/**
 * ACORDEÃO
 * Lista de itens que abrem e fecham ao clicar no título.
 * Só um item fica aberto por vez: abrir um item fecha o anterior.
 *
 * Props:
 *  - items: lista de { id, title, content }
 *  - defaultOpenId: id do item que começa aberto (opcional)
 *
 * Acessibilidade:
 *  - cada título é um <button> dentro de um <h3>, então funciona com Tab, Enter e Espaço
 *  - aria-expanded informa se o item está aberto
 *  - aria-controls liga o botão ao painel; o painel é um <section> nomeado pelo botão
 */
function Accordion({ items, defaultOpenId = null }) {
  // State: id do item aberto (null = todos fechados)
  const [openItemId, setOpenItemId] = useState(defaultOpenId)

  // useId gera um prefixo único, assim os ids não se repetem
  // mesmo que existam dois acordeões na mesma página.
  const baseId = useId()

  function handleToggle(itemId) {
    // Clicar no item aberto fecha; clicar em outro abre esse e fecha o anterior
    setOpenItemId((currentId) => (currentId === itemId ? null : itemId))
  }

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = item.id === openItemId
        const buttonId = `${baseId}-button-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`

        return (
          <div key={item.id} className={styles.item} data-open={isOpen}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
              >
                <span>{item.title}</span>
                <svg className={styles.icon} viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </button>
            </h3>

            {/*
              O painel continua no HTML mesmo fechado: é isso que permite a animação.
              Fechado, ele fica com visibility: hidden (no CSS), o que também o esconde
              de leitores de tela e da navegação por Tab.
            */}
            <section
              id={panelId}
              aria-labelledby={buttonId}
              className={styles.panel}
              data-open={isOpen}
            >
              <div className={styles.panelInner}>
                <p className={styles.content}>{item.content}</p>
              </div>
            </section>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
