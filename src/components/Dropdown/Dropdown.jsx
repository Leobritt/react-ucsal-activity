import { useEffect, useId, useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside.js'
import styles from './Dropdown.module.css'

/**
 * MENU SUSPENSO
 * Um botão que abre uma lista de opções. Funciona de dois jeitos:
 *  - seleção: quando recebe "selectedValue", marca a opção escolhida
 *    (ex.: filtro de categoria) e mostra a escolha no botão;
 *  - ações: sem "selectedValue", cada opção só dispara sua ação
 *    (ex.: "Copiar link").
 *
 * Props:
 *  - label: texto do botão
 *  - options: lista de { value, label, onSelect? } — onSelect é o callback próprio da opção
 *  - selectedValue: valor selecionado (opcional, ativa o modo seleção)
 *  - onSelect: callback geral, recebe (value, option) quando qualquer opção é escolhida
 *  - align: 'start' ou 'end' — de que lado do botão a lista se alinha
 *
 * Fecha ao escolher uma opção, ao clicar fora (hook useClickOutside) e com Esc.
 * Teclado: ↓/↑ percorrem as opções, Home/End vão para a primeira/última.
 */
function Dropdown({ label, options, selectedValue, onSelect, align = 'start' }) {
  // State: a lista está aberta? e qual opção está com o foco?
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const optionRefs = useRef([])
  const baseId = useId()

  const isSelectionMode = selectedValue !== undefined
  const selectedIndex = options.findIndex((option) => option.value === selectedValue)
  const selectedOption = options[selectedIndex]

  // Sempre que a lista abre ou a opção ativa muda, move o foco para ela
  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus()
    }
  }, [isOpen, activeIndex])

  // Fecha ao clicar fora, mas só escuta cliques enquanto a lista está aberta
  useClickOutside(containerRef, () => setIsOpen(false), isOpen)

  function openMenu(startIndex) {
    setActiveIndex(startIndex)
    setIsOpen(true)
  }

  function closeMenu({ returnFocus = false } = {}) {
    setIsOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  function handleButtonClick() {
    if (isOpen) {
      closeMenu()
    } else {
      // Abre com o foco na opção selecionada (ou na primeira)
      openMenu(Math.max(selectedIndex, 0))
    }
  }

  function handleButtonKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openMenu(Math.max(selectedIndex, 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openMenu(options.length - 1)
    }
  }

  function handleMenuKeyDown(event) {
    const lastIndex = options.length - 1

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => (index === lastIndex ? 0 : index + 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => (index === 0 ? lastIndex : index - 1))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(lastIndex)
        break
      case 'Escape':
        event.preventDefault()
        closeMenu({ returnFocus: true })
        break
      case 'Tab':
        // Deixa o Tab seguir normalmente para o próximo elemento, só fecha a lista
        closeMenu()
        break
      default:
        break
    }
  }

  function handleOptionClick(option) {
    option.onSelect?.(option) // callback da própria opção, se existir
    onSelect?.(option.value, option) // callback geral do componente, se existir
    closeMenu({ returnFocus: true })
  }

  const buttonId = `${baseId}-button`
  const menuId = `${baseId}-menu`

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
      >
        <span className={styles.triggerText}>
          {isSelectionMode ? (
            <>
              <span className={styles.triggerLabel}>{label}:</span> {selectedOption?.label}
            </>
          ) : (
            label
          )}
        </span>
        <svg className={styles.chevron} data-open={isOpen} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {/* Renderização condicional: a lista só existe no HTML enquanto está aberta */}
      {isOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className={styles.menu}
          data-align={align}
          onKeyDown={handleMenuKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = isSelectionMode && option.value === selectedValue
            return (
              <li key={option.value} role="none">
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element
                  }}
                  type="button"
                  role={isSelectionMode ? 'menuitemradio' : 'menuitem'}
                  aria-checked={isSelectionMode ? isSelected : undefined}
                  tabIndex={-1}
                  className={styles.option}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
