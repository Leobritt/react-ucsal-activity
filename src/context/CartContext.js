import { createContext } from 'react'

/**
 * Contexto do carrinho (Context API).
 * Compartilha os itens do carrinho e as funções que os alteram entre
 * componentes que não têm relação direta: o cabeçalho mostra a quantidade,
 * os cartões de produto adicionam itens e a página do carrinho lista tudo.
 */
export const CartContext = createContext(null)
