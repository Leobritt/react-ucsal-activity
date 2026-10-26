import { useCallback, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import { useToast } from '../hooks/useToast.js'
import { CartContext } from './CartContext.js'

const STORAGE_KEY = 'circuito:cart'

function loadSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function CartProvider({ children }) {
  const [items, setItems] = useState(loadSavedCart)
  const { showToast } = useToast()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addToCart = useCallback(
    (product) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id)
        if (existing) {
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

  const contextValue = useMemo(() => {
    const detailedItems = items
      .map((item) => ({ ...item, product: PRODUCTS.find((product) => product.id === item.productId) }))
      .filter((item) => item.product)

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
