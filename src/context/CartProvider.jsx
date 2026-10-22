import { useCallback, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import { useToast } from '../hooks/useToast.js'
import { CartContext } from './CartContext.js'

const STORAGE_KEY = 'circuito:cart'

// Lê o carrinho salvo no navegador. Se não houver nada (ou o navegador
// bloquear o acesso), começa vazio.
function loadSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

/**
 * Provider do carrinho: guarda os itens como { productId, quantity }.
 * Os dados completos de cada produto são buscados na lista de produtos,
 * assim o que fica salvo no navegador é pequeno.
 *
 * Fica DENTRO do ToastProvider (ver main.jsx), por isso pode usar useToast
 * para avisar quando um item é adicionado.
 */
function CartProvider({ children }) {
  // Inicialização preguiçosa: passando a função (sem chamar), o React
  // só lê o localStorage na primeira renderização, não em todas.
  const [items, setItems] = useState(loadSavedCart)
  const { showToast } = useToast()

  // Sincroniza com um sistema externo (o localStorage) sempre que o carrinho muda.
  // Assim o carrinho continua lá se a pessoa recarregar a página.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Navegação privada ou armazenamento cheio: o carrinho só não fica salvo
    }
  }, [items])

  const addToCart = useCallback(
    (product) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id)
        if (existing) {
          // Produto já está no carrinho: só aumenta a quantidade
          return current.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        }
        return [...current, { productId: product.id, quantity: 1 }]
      })
      showToast({ type: 'success', message: `Adicionado ao carrinho: ${product.name}.` })
    },
    [showToast],
  )

  // Soma "change" à quantidade (+1 ou -1). Se chegar a zero, o item sai do carrinho.
  const changeQuantity = useCallback((productId, change) => {
    setItems((current) =>
      current
        .map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  // Valores derivados: calculados a partir dos itens, sem state próprio
  const contextValue = useMemo(() => {
    const detailedItems = items
      .map((item) => ({ ...item, product: PRODUCTS.find((product) => product.id === item.productId) }))
      .filter((item) => item.product) // ignora produtos que não existem mais

    return {
      items: detailedItems,
      itemCount: detailedItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: detailedItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
    }
  }, [items, addToCart, changeQuantity, removeFromCart, clearCart])

  return <CartContext value={contextValue}>{children}</CartContext>
}

export default CartProvider
