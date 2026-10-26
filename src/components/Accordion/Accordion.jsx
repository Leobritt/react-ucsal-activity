import { useId, useState } from 'react'
import styles from './Accordion.module.css'

function Accordion({ items, defaultOpenId = null, headingLevel = 3 }) {
  const HeadingTag = `h${headingLevel}`
  const [openItemId, setOpenItemId] = useState(defaultOpenId)

  const baseId = useId()

  function handleToggle(itemId) {
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
            <HeadingTag className={styles.heading}>
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
            </HeadingTag>

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
