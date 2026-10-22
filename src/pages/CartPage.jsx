import { Link } from 'react-router'
import Page from '../components/layout/Page.jsx'
import { useCart } from '../hooks/useCart.js'
import { useToast } from '../hooks/useToast.js'
import { formatCurrency } from '../utils/format.js'
import styles from './CartPage.module.css'

/**
 * Página do carrinho (rota "/carrinho").
 * Lê e altera o mesmo carrinho que o cabeçalho e os cartões de produto usam:
 * é o CartContext que mantém tudo sincronizado.
 */
function CartPage() {
  const { items, itemCount, totalPrice, changeQuantity, removeFromCart, clearCart } = useCart()
  const { showToast } = useToast()

  function handleRemove(item) {
    removeFromCart(item.productId)
    showToast({ type: 'info', message: `Removido do carrinho: ${item.product.name}.` })
  }

  function handleClear() {
    clearCart()
    showToast({ type: 'info', message: 'Carrinho esvaziado.' })
  }

  function handleCheckout() {
    clearCart()
    showToast({ type: 'success', message: 'Pedido finalizado. Esta loja é fictícia: nenhum pagamento foi cobrado.' })
  }

  // Carrinho vazio: em vez de uma tela em branco, um convite para a próxima ação
  if (items.length === 0) {
    return (
      <Page title="Carrinho" description="Seu carrinho está vazio.">
        <Link to="/produtos" className="button button--primary">
          Ver produtos
        </Link>
      </Page>
    )
  }

  const itemLabel = itemCount === 1 ? 'item' : 'itens'

  return (
    <Page title="Carrinho" description={`${itemCount} ${itemLabel} no carrinho.`}>
      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.productId} className={styles.item}>
              <div className={styles.info}>
                <Link to={`/produtos/${item.productId}`} className={styles.name}>
                  {item.product.name}
                </Link>
                <p className={styles.unitPrice}>{formatCurrency(item.product.price)} cada</p>
              </div>

              {/* fieldset + legend agrupam os botões: "Quantidade de <produto>" */}
              <fieldset className={styles.quantity}>
                <legend className="visually-hidden">Quantidade de {item.product.name}</legend>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => changeQuantity(item.productId, -1)}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span className={styles.quantityValue}>{item.quantity}</span>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => changeQuantity(item.productId, 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </fieldset>

              <p className={styles.lineTotal}>{formatCurrency(item.product.price * item.quantity)}</p>

              <button type="button" className={styles.remove} onClick={() => handleRemove(item)}>
                Remover
                <span className="visually-hidden"> {item.product.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <aside className={styles.summary} aria-labelledby="cart-summary-title">
          <h2 id="cart-summary-title" className={styles.summaryTitle}>
            Resumo
          </h2>
          <dl className={styles.totals}>
            <div>
              <dt>Itens</dt>
              <dd>{itemCount}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd className={styles.total}>{formatCurrency(totalPrice)}</dd>
            </div>
          </dl>
          <button type="button" className="button button--primary" onClick={handleCheckout}>
            Finalizar pedido
          </button>
          <button type="button" className="button button--secondary" onClick={handleClear}>
            Esvaziar carrinho
          </button>
        </aside>
      </div>
    </Page>
  )
}

export default CartPage
