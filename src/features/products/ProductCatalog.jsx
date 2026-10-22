import { useMemo, useRef, useState } from 'react'
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

// Funções de comparação usadas pelo Array.sort para cada ordenação
const SORT_COMPARATORS = {
  relevance: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
}

/**
 * Catálogo de produtos: junta o MENU SUSPENSO (filtro e ordenação)
 * e a PAGINAÇÃO.
 *
 * Props:
 *  - products: lista completa de produtos
 *  - categories: opções de categoria para o filtro
 *  - onViewDetails: repassado a cada cartão
 *  - onAddToCart: repassado a cada cartão
 */
function ProductCatalog({ products, categories, onViewDetails, onAddToCart }) {
  // State local: filtro, ordenação e página atual
  const [category, setCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)

  const listTopRef = useRef(null)

  // useMemo: só refaz o filtro e a ordenação quando algo que eles usam muda.
  // Mudar de página, por exemplo, não refaz esse cálculo.
  const filteredProducts = useMemo(() => {
    const byCategory =
      category === 'all' ? products : products.filter((product) => product.category === category)
    // [...lista] cria uma cópia: o sort altera o array, e não queremos mexer nas props
    return [...byCategory].sort(SORT_COMPARATORS[sortOrder])
  }, [products, category, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const firstIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const pageProducts = filteredProducts.slice(firstIndex, firstIndex + PRODUCTS_PER_PAGE)

  // Trocar o filtro ou a ordenação volta para a página 1,
  // senão poderíamos ficar numa página que não existe mais.
  function handleCategoryChange(newCategory) {
    setCategory(newCategory)
    setCurrentPage(1)
  }

  function handleSortChange(newSortOrder) {
    setSortOrder(newSortOrder)
    setCurrentPage(1)
  }

  function handlePageChange(page) {
    setCurrentPage(page)
    // Leva a tela de volta ao início da lista (útil no celular, onde a paginação fica bem embaixo)
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
            // key: ajuda o React a saber qual cartão é qual entre as renderizações
            <li key={product.id}>
              <ProductCard product={product} onViewDetails={onViewDetails} onAddToCart={onAddToCart} />
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
