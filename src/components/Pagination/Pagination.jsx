import { getPageItems } from './getPageItems.js'
import styles from './Pagination.module.css'

/**
 * PAGINAÇÃO
 * Componente "controlado": ele não guarda a página atual no próprio state.
 * Quem usa o componente guarda a página e a recebe de volta pelo callback,
 * assim o componente pai decide o que fazer (filtrar a lista, rolar a tela...).
 *
 * Props:
 *  - currentPage: página atual (começa em 1)
 *  - totalPages: número total de páginas
 *  - onPageChange: função chamada com o número da nova página
 *  - label: nome da navegação para leitores de tela (opcional)
 */
function Pagination({ currentPage, totalPages, onPageChange, label = 'Paginação' }) {
  // Com uma página só, não há para onde navegar
  if (totalPages <= 1) return null

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const pageItems = getPageItems(currentPage, totalPages)

  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  return (
    <nav className={styles.pagination} aria-label={label}>
      <button
        type="button"
        className={`${styles.button} ${styles.step}`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        <svg className={styles.arrow} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M12 5l-5 5 5 5" />
        </svg>
        <span className={styles.stepText}>Anterior</span>
        <span className="visually-hidden"> página</span>
      </button>

      <ul className={styles.pages}>
        {pageItems.map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                className={styles.button}
                onClick={() => goToPage(item)}
                // aria-current="page" avisa ao leitor de tela qual é a página atual
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Página ${item}`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={`${styles.button} ${styles.step}`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLastPage}
      >
        <span className={styles.stepText}>Próxima</span>
        <span className="visually-hidden"> página</span>
        <svg className={styles.arrow} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M8 5l5 5-5 5" />
        </svg>
      </button>

      {/* Anuncia a mudança de página para leitores de tela */}
      <p className="visually-hidden" aria-live="polite">
        Página {currentPage} de {totalPages}
      </p>
    </nav>
  )
}

export default Pagination
