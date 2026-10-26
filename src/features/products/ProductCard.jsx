import { Link } from 'react-router'
import { getCategoryLabel } from '../../data/products.js'
import { useCart } from '../../hooks/useCart.js'
import { formatCurrency } from '../../utils/format.js'
import CategoryIcon from './CategoryIcon.jsx'
import styles from './ProductCard.module.css'

function ProductCard({ product, headingLevel = 3 }) {
  const HeadingTag = `h${headingLevel}`
  const { addToCart } = useCart()

  const titleId = `product-${product.id}-title`

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.visual} data-category={product.category}>
        <CategoryIcon category={product.category} className={styles.icon} />
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{getCategoryLabel(product.category)}</p>
        <HeadingTag id={titleId} className={styles.name}>
          {product.name}
        </HeadingTag>
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
        <Link to={`/produtos/${product.id}`} className="button button--secondary">
          Ver detalhes
          <span className="visually-hidden"> de {product.name}</span>
        </Link>
        <button type="button" className="button button--primary" onClick={() => addToCart(product)}>
          Adicionar
          <span className="visually-hidden"> {product.name} ao carrinho</span>
        </button>
      </div>
    </article>
  )
}

export default ProductCard
