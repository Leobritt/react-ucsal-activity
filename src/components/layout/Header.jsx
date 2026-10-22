import { useEffect, useState } from 'react'
import styles from './Header.module.css'

/**
 * Cabeçalho fixo com a marca e o menu de navegação.
 * No celular o menu fica recolhido atrás do botão "Menu";
 * a partir do tablet os links aparecem sempre (controlado pelo CSS).
 *
 * Props:
 *  - links: lista de { href, label } exibidos no menu
 */
function Header({ links }) {
  // State local: o menu do celular está aberto?
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Fecha o menu com a tecla Esc. O listener só existe enquanto o menu está aberto,
  // e a função de limpeza remove o listener quando o menu fecha ou o componente sai da tela.
  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  function toggleMenu() {
    // Forma funcional do setState: usa o valor anterior para calcular o próximo
    setIsMenuOpen((wasOpen) => !wasOpen)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand} onClick={closeMenu}>
          <svg className={styles.brandMark} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M3 16h8l2.5-6 4 13 2.5-7h9" />
          </svg>
          Circuito
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          <span className={styles.menuIcon} data-open={isMenuOpen} aria-hidden="true" />
          Menu
        </button>

        <nav
          id="main-navigation"
          aria-label="Principal"
          className={styles.nav}
          data-open={isMenuOpen}
        >
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
