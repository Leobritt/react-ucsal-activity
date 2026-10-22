import { getCategoryLabel } from '../../data/products.js'
import { formatCurrency } from '../../utils/format.js'
import CategoryIcon from './CategoryIcon.jsx'
import styles from './ProductCard.module.css'

/**
 * Cartão de um produto no catálogo.
 * Não tem state: tudo o que mostra chega por props, e os cliques
 * são repassados ao componente pai pelos callbacks.
 *
 * Props:
 *  - product: objeto do produto
 *  - onViewDetails: chamado com o id do produto em "Ver detalhes"
 *  - onAddToCart: chamado com o produto em "Adicionar ao carrinho"
 */
function ProductCard({ product, onViewDetails, onAddToCart }) {
  const titleId = `product-${product.id}-title`

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.visual} data-category={product.category}>
        <CategoryIcon category={product.category} className={styles.icon} />
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{getCategoryLabel(product.category)}</p>
        <h3 id={titleId} className={styles.name}>
          {product.name}
        </h3>
        <p className={styles.summary}>{product.summary}</p>

        <div className={styles.meta}>
          <p className={styles.price}>{formatCurrency(product.price)}</p>
          <p className={styles.rating}>
            <span aria-hidden="true">★ {product.rating.toLocaleString('pt-BR')}</span>
            <span className="visually-hidden">
              Nota {product.rating.toLocaleString('pt-BR')} de 5
            </span>
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className="button button--secondary" onClick={() => onViewDetails(product.id)}>
          Ver detalhes
          <span className="visually-hidden"> de {product.name}</span>
        </button>
        <button type="button" className="button button--primary" onClick={() => onAddToCart(product)}>
          Adicionar
          <span className="visually-hidden"> {product.name} ao carrinho</span>
        </button>
      </div>
    </article>
  )
}

export default ProductCard
