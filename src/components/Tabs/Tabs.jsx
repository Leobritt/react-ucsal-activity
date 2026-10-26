import { useId, useRef, useState } from 'react'
import styles from './Tabs.module.css'

function Tabs({ tabs, defaultTabId, label }) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id)

  const tabRefs = useRef([])
  const baseId = useId()

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
      event.preventDefault()
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
