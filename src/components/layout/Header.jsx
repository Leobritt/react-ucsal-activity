import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useCart } from '../../hooks/useCart.js'
import styles from './Header.module.css'

/**
 * Cabeçalho fixo com a marca e o menu de navegação.
 * No celular o menu fica recolhido atrás do botão "Menu";
 * a partir do tablet os links aparecem sempre (controlado pelo CSS).
 *
 * Props:
 *  - links: lista de { to, label } exibidos no menu
 *
 * A quantidade do carrinho vem do CartContext (useCart): o cabeçalho e os
 * cartões de produto não têm relação direta, mas enxergam o mesmo carrinho.
 */
function Header({ links }) {
  const { itemCount } = useCart()

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
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <svg className={styles.brandMark} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M3 16h8l2.5-6 4 13 2.5-7h9" />
          </svg>
          Circuito
        </Link>

        {/* Link para a página do carrinho; o leitor de tela ouve "Carrinho: 2 itens" */}
        <Link to="/carrinho" className={styles.cart} onClick={closeMenu}>
          <svg className={styles.cartIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.4 10.2a1.5 1.5 0 0 0 1.5 1.1h8.4a1.5 1.5 0 0 0 1.4-1l2-6.3H6.2" />
            <circle cx="9.5" cy="19.5" r="1.3" />
            <circle cx="17" cy="19.5" r="1.3" />
          </svg>
          <span className="visually-hidden">Carrinho: </span>
          <span className={styles.cartCount}>{itemCount}</span>
          <span className="visually-hidden"> {itemCount === 1 ? 'item' : 'itens'}</span>
        </Link>

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
              <li key={link.to}>
                {/* NavLink marca o link da página atual com aria-current="page" */}
                <NavLink to={link.to} className={styles.navLink} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
