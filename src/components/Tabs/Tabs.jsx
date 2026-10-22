import { useId, useRef, useState } from 'react'
import styles from './Tabs.module.css'

/**
 * ABAS
 * Organiza conteúdos em painéis; só o painel da aba ativa aparece.
 *
 * Props:
 *  - tabs: lista de { id, label, content } — content pode ser qualquer JSX
 *  - defaultTabId: aba que começa ativa (padrão: a primeira)
 *  - label: nome do grupo de abas para leitores de tela
 *
 * Acessibilidade (padrão de abas da WAI-ARIA):
 *  - role="tablist", "tab" e "tabpanel", com aria-selected na aba ativa
 *  - só a aba ativa entra no Tab do teclado; as setas ← → trocam de aba,
 *    Home vai para a primeira e End para a última
 */
function Tabs({ tabs, defaultTabId, label }) {
  // State: qual aba está ativa
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id)

  // useRef guarda referências aos botões das abas, para mover o foco pelo teclado.
  // Diferente do state, mudar uma ref não faz o componente renderizar de novo.
  const tabRefs = useRef([])
  const baseId = useId()

  // Se a lista de abas mudar e a aba ativa não existir mais, volta para a primeira
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]
  const activeIndex = tabs.indexOf(activeTab)

  function selectTab(index) {
    setActiveTabId(tabs[index].id)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event) {
    const lastIndex = tabs.length - 1
    const keyActions = {
      ArrowRight: () => selectTab(activeIndex === lastIndex ? 0 : activeIndex + 1),
      ArrowLeft: () => selectTab(activeIndex === 0 ? lastIndex : activeIndex - 1),
      Home: () => selectTab(0),
      End: () => selectTab(lastIndex),
    }

    const action = keyActions[event.key]
    if (action) {
      event.preventDefault() // evita rolar a página com Home/End
      action()
    }
  }

  return (
    <div className={styles.tabs}>
      <div role="tablist" aria-label={label} className={styles.tabList}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab.id
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={styles.tab}
              onClick={() => setActiveTabId(tab.id)}
              onKeyDown={handleKeyDown}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Só o conteúdo da aba ativa é exibido */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeTab.id}`}
        aria-labelledby={`${baseId}-tab-${activeTab.id}`}
        tabIndex={0}
        className={styles.panel}
      >
        {activeTab.content}
      </div>
    </div>
  )
}

export default Tabs
