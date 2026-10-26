import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useCart } from '../../hooks/useCart.js'
import styles from './Header.module.css'

function Header({ links }) {
  const { itemCount } = useCart()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  function toggleMenu() {
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
