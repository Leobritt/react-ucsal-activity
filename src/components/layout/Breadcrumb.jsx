import { Link } from 'react-router'
import styles from './Breadcrumb.module.css'

/**
 * Trilha de navegação ("Início / Produtos / Nome do produto").
 *
 * Props:
 *  - items: lista de { label, to }. O último item é a página atual e não tem link.
 */
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Trilha de navegação" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1
          return (
            <li key={item.label} className={styles.item}>
              {isCurrentPage ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
