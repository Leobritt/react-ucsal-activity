import Dropdown from '../../components/Dropdown/Dropdown.jsx'
import Tabs from '../../components/Tabs/Tabs.jsx'
import { getCategoryLabel } from '../../data/products.js'
import { useToast } from '../../hooks/useToast.js'
import { formatCurrency } from '../../utils/format.js'
import CategoryIcon from './CategoryIcon.jsx'
import styles from './ProductDetails.module.css'

// Estrelas em texto ("★★★★☆"); o leitor de tela recebe a nota por extenso
function Stars({ rating }) {
  const filled = Math.round(rating)
  return (
    <span className={styles.stars}>
      <span aria-hidden="true">{'★'.repeat(filled) + '☆'.repeat(5 - filled)}</span>
      <span className="visually-hidden">{filled} de 5 estrelas</span>
    </span>
  )
}

/**
 * Detalhes do produto selecionado, organizados em ABAS,
 * com um MENU SUSPENSO de ações para compartilhar.
 *
 * Props:
 *  - product: produto a exibir
 *  - onAddToCart: chamado com o produto ao clicar em "Adicionar ao carrinho"
 *
 * As notificações vêm do contexto (useToast), sem precisar de props.
 */
function ProductDetails({ product, onAddToCart }) {
  const { showToast } = useToast()

  // Conteúdo de cada aba. Como "content" aceita JSX, cada aba tem seu próprio layout.
  const tabs = [
    {
      id: 'description',
      label: 'Descrição',
      content: <p className={styles.description}>{product.description}</p>,
    },
    {
      id: 'specs',
      label: 'Especificações',
      content: (
        <dl className={styles.specs}>
          {product.specs.map((spec) => (
            <div key={spec.label} className={styles.specRow}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: 'reviews',
      label: `Avaliações (${product.reviews.length})`,
      content: (
        <ul className={styles.reviews}>
          {product.reviews.map((review) => (
            <li key={review.author} className={styles.review}>
              <p className={styles.reviewHeader}>
                <strong>{review.author}</strong>
                <Stars rating={review.rating} />
              </p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      ),
    },
  ]

  // Cada opção do menu tem o seu próprio callback (onSelect)
  const shareOptions = [
    {
      value: 'copy-link',
      label: 'Copiar link',
      onSelect: async () => {
        const link = `${window.location.origin}${window.location.pathname}#detalhes`
        try {
          await navigator.clipboard.writeText(link)
          showToast({ type: 'success', message: 'Link copiado.' })
        } catch {
          showToast({
            type: 'error',
            message: 'Não foi possível copiar o link. Copie o endereço pela barra do navegador.',
          })
        }
      },
    },
    {
      value: 'email',
      label: 'Enviar por e-mail',
      onSelect: () => {
        const subject = encodeURIComponent(`Olha este produto: ${product.name}`)
        const body = encodeURIComponent(`${product.name} por ${formatCurrency(product.price)} na Circuito.`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
        showToast({ type: 'info', message: 'Abrindo seu aplicativo de e-mail.' })
      },
    },
    {
      value: 'price-alert',
      label: 'Avisar quando baixar o preço',
      onSelect: () => {
        showToast({ type: 'success', message: `Alerta criado. Avisaremos quando ${product.name} baixar de preço.` })
      },
    },
  ]

  return (
    <article className={styles.details} aria-labelledby="product-details-name">
      <div className={styles.summary}>
        <div className={styles.visual} data-category={product.category}>
          <CategoryIcon category={product.category} className={styles.icon} />
        </div>

        <p className={styles.category}>{getCategoryLabel(product.category)}</p>
        <h3 id="product-details-name" className={styles.name}>
          {product.name}
        </h3>
        <p className={styles.rating}>
          <Stars rating={product.rating} /> {product.rating.toLocaleString('pt-BR')}
        </p>
        <p className={styles.price}>{formatCurrency(product.price)}</p>

        <div className={styles.actions}>
          <button type="button" className="button button--primary" onClick={() => onAddToCart(product)}>
            Adicionar ao carrinho
          </button>
          <Dropdown label="Compartilhar" options={shareOptions} />
        </div>
      </div>

      <div className={styles.tabsArea}>
        <Tabs tabs={tabs} label={`Informações sobre ${product.name}`} />
      </div>
    </article>
  )
}

export default ProductDetails
