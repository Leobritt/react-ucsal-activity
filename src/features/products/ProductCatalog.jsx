import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router'
import Dropdown from '../../components/Dropdown/Dropdown.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import ProductCard from './ProductCard.jsx'
import styles from './ProductCatalog.module.css'

const PRODUCTS_PER_PAGE = 4

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Mais relevantes' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliados' },
]

const SORT_COMPARATORS = {
  relevance: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
}

function ProductCatalog({ products, categories, cardHeadingLevel = 3 }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const listTopRef = useRef(null)

  const categoryParam = searchParams.get('categoria')
  const category = categories.some((option) => option.value === categoryParam) ? categoryParam : 'all'
  const sortParam = searchParams.get('ordem')
  const sortOrder = sortParam in SORT_COMPARATORS ? sortParam : 'relevance'
  const requestedPage = Number(searchParams.get('pagina')) || 1

  const filteredProducts = useMemo(() => {
    const byCategory =
      category === 'all' ? products : products.filter((product) => product.category === category)
    return [...byCategory].sort(SORT_COMPARATORS[sortOrder])
  }, [products, category, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages)
  const firstIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const pageProducts = filteredProducts.slice(firstIndex, firstIndex + PRODUCTS_PER_PAGE)

  function updateSearchParams(changes) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      Object.entries(changes).forEach(([key, value]) => {
        if (value === null) next.delete(key)
        else next.set(key, String(value))
      })
      return next
    })
  }

  function handleCategoryChange(newCategory) {
    updateSearchParams({ categoria: newCategory === 'all' ? null : newCategory, pagina: null })
  }

  function handleSortChange(newSortOrder) {
    updateSearchParams({ ordem: newSortOrder === 'relevance' ? null : newSortOrder, pagina: null })
  }

  function handlePageChange(page) {
    updateSearchParams({ pagina: page === 1 ? null : page })
    listTopRef.current?.scrollIntoView({ block: 'start' })
  }

  const lastShown = firstIndex + pageProducts.length

  return (
    <div className={styles.catalog}>
      <div className={styles.toolbar} ref={listTopRef}>
        <Dropdown
          label="Categoria"
          options={categories}
          selectedValue={category}
          onSelect={handleCategoryChange}
        />
        <Dropdown
          label="Ordenar"
          options={SORT_OPTIONS}
          selectedValue={sortOrder}
          onSelect={handleSortChange}
          align="end"
        />
        <p className={styles.count}>
          {filteredProducts.length === 0
            ? 'Nenhum produto encontrado'
            : `Mostrando ${firstIndex + 1}–${lastShown} de ${filteredProducts.length} produtos`}
        </p>
      </div>

      {pageProducts.length > 0 ? (
        <ul className={styles.grid}>
          {pageProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} headingLevel={cardHeadingLevel} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Nenhum produto nesta categoria. Escolha outra categoria no filtro.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        label="Páginas do catálogo"
      />
    </div>
  )
}

export default ProductCatalog
