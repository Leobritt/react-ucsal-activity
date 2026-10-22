import { useContext } from 'react'
import { CartContext } from '../context/CartContext.js'

/**
 * Hook personalizado para ler e alterar o carrinho de qualquer componente.
 *
 * Uso:
 *   const { itemCount, addToCart } = useCart()
 */
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart precisa ser usado dentro de <CartProvider>.')
  }

  return context
}
