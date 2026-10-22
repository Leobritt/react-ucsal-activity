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
 * Filtro, ordenação e página ficam na URL (?categoria=sensors&ordem=price-asc&pagina=2)
 * com o useSearchParams do React Router. Assim, ao abrir um produto e voltar,
 * o catálogo continua onde estava, e o link pode ser compartilhado.
 *
 * Props:
 *  - products: lista completa de produtos
 *  - categories: opções de categoria para o filtro
 *  - cardHeadingLevel: nível do título de cada cartão (padrão: 3)
 */
function ProductCatalog({ products, categories, cardHeadingLevel = 3 }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const listTopRef = useRef(null)

  // Lê os valores da URL; se vierem inválidos (URL digitada errada), usa o padrão
  const categoryParam = searchParams.get('categoria')
  const category = categories.some((option) => option.value === categoryParam) ? categoryParam : 'all'
  const sortParam = searchParams.get('ordem')
  const sortOrder = sortParam in SORT_COMPARATORS ? sortParam : 'relevance'
  const requestedPage = Number(searchParams.get('pagina')) || 1

  // useMemo: só refaz o filtro e a ordenação quando algo que eles usam muda.
  // Mudar de página, por exemplo, não refaz esse cálculo.
  const filteredProducts = useMemo(() => {
    const byCategory =
      category === 'all' ? products : products.filter((product) => product.category === category)
    // [...lista] cria uma cópia: o sort altera o array, e não queremos mexer nas props
    return [...byCategory].sort(SORT_COMPARATORS[sortOrder])
  }, [products, category, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  // Garante uma página válida, mesmo que a URL peça a página 99
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages)
  const firstIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const pageProducts = filteredProducts.slice(firstIndex, firstIndex + PRODUCTS_PER_PAGE)

  // Atualiza só os parâmetros informados, mantendo os outros.
  // null remove o parâmetro (valores padrão não precisam aparecer na URL).
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

  // Trocar o filtro ou a ordenação volta para a página 1,
  // senão poderíamos ficar numa página que não existe mais.
  function handleCategoryChange(newCategory) {
    updateSearchParams({ categoria: newCategory === 'all' ? null : newCategory, pagina: null })
  }

  function handleSortChange(newSortOrder) {
    updateSearchParams({ ordem: newSortOrder === 'relevance' ? null : newSortOrder, pagina: null })
  }

  function handlePageChange(page) {
    updateSearchParams({ pagina: page === 1 ? null : page })
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
