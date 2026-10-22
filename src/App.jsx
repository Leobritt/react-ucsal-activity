import { useCallback, useRef, useState } from 'react'
import Accordion from './components/Accordion/Accordion.jsx'
import Footer from './components/layout/Footer.jsx'
import Header from './components/layout/Header.jsx'
import Section from './components/layout/Section.jsx'
import ToastContainer from './components/Toast/ToastContainer.jsx'
import { FAQ_ITEMS } from './data/faq.js'
import { CATEGORIES, PRODUCTS } from './data/products.js'
import ExchangeRequest from './features/exchange/ExchangeRequest.jsx'
import ProductCatalog from './features/products/ProductCatalog.jsx'
import ProductDetails from './features/products/ProductDetails.jsx'
import styles from './App.module.css'

// Links do menu principal: cada um aponta para o id de uma seção da página.
const NAVIGATION_LINKS = [
  { href: '#produtos', label: 'Produtos' },
  { href: '#detalhes', label: 'Detalhes' },
  { href: '#trocas', label: 'Trocas' },
  { href: '#duvidas', label: 'Dúvidas' },
]

// O acordeão espera { id, title, content }; aqui adaptamos o formato das perguntas
const FAQ_ACCORDION_ITEMS = FAQ_ITEMS.map((item) => ({
  id: item.id,
  title: item.question,
  content: item.answer,
}))

// Quantos toasts podem aparecer ao mesmo tempo
const MAX_VISIBLE_TOASTS = 4

/**
 * Componente principal. Ele orquestra a página:
 *  - guarda o state compartilhado entre seções (produto selecionado,
 *    carrinho e notificações);
 *  - passa esses dados e as funções que os alteram para os filhos via props.
 *
 * Nesta versão (v1-base), as notificações descem por props até quem precisa
 * delas ("prop drilling"). Na versão do desafio extra, isso vira Context API.
 */
function App() {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id)
  const [cartItems, setCartItems] = useState([])
  const [toasts, setToasts] = useState([])

  // useRef para guardar o próximo id de toast: muda sem causar nova renderização
  const nextToastId = useRef(1)
  const detailsSectionRef = useRef(null)

  const selectedProduct = PRODUCTS.find((product) => product.id === selectedProductId)

  // ---------- Notificações ----------

  // useCallback mantém a MESMA função entre renderizações.
  // Isso importa porque showToast e dismissToast são dependências de useEffect
  // em componentes filhos (Toast e ExchangeRequest): se a função mudasse
  // a cada renderização, os efeitos rodariam de novo sem necessidade.
  const showToast = useCallback(({ type, message, duration }) => {
    const id = nextToastId.current++
    setToasts((current) => [...current, { id, type, message, duration }].slice(-MAX_VISIBLE_TOASTS))
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  // ---------- Ações dos produtos ----------

  function handleAddToCart(product) {
    setCartItems((current) => [...current, product.id])
    showToast({ type: 'success', message: `Adicionado ao carrinho: ${product.name}.` })
  }

  function handleViewDetails(productId) {
    setSelectedProductId(productId)
    // Move o foco para a seção de detalhes: a tela rola até ela e
    // o leitor de tela anuncia o novo conteúdo
    detailsSectionRef.current?.focus()
  }

  return (
    <>
      {/* Primeiro elemento focável: permite pular o menu usando o teclado */}
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header links={NAVIGATION_LINKS} cartCount={cartItems.length} />

      <main id="conteudo" tabIndex={-1}>
        <section id="inicio" aria-labelledby="hero-title" className={styles.hero}>
          <div className="container">
            <h1 id="hero-title" className={styles.heroTitle}>
              Placas, sensores e ferramentas para tirar o projeto da protoboard.
            </h1>
            <p className={styles.heroText}>
              A Circuito é uma loja fictícia de eletrônicos para estudantes e makers.
              Escolha os componentes, compare as especificações e acompanhe sua troca
              por aqui.
            </p>
            <div className={styles.heroActions}>
              <a href="#produtos" className="button button--primary">
                Ver produtos
              </a>
              <a href="#duvidas" className="button button--secondary">
                Tirar dúvidas
              </a>
            </div>
          </div>

          {/* Desenho decorativo de uma trilha de circuito; escondido de leitores de tela */}
          <svg className={styles.trace} viewBox="0 0 1200 80" aria-hidden="true">
            <path d="M0 60 H420 L460 20 H900 L930 50 H1200" />
            <circle cx="460" cy="20" r="7" />
            <circle cx="930" cy="50" r="7" />
          </svg>
        </section>

        <Section
          id="produtos"
          title="Produtos"
          description="Filtre por categoria, ordene e navegue pelas páginas do catálogo."
        >
          <ProductCatalog
            products={PRODUCTS}
            categories={CATEGORIES}
            onViewDetails={handleViewDetails}
            onAddToCart={handleAddToCart}
          />
        </Section>

        <Section
          id="detalhes"
          ref={detailsSectionRef}
          title="Detalhes do produto"
          description="Descrição, especificações técnicas e avaliações de quem já comprou."
        >
          <ProductDetails product={selectedProduct} onAddToCart={handleAddToCart} onNotify={showToast} />
        </Section>

        <Section
          id="trocas"
          title="Solicitar troca"
          description="Recebeu um produto com defeito? Envie uma foto para abrir a solicitação."
        >
          <ExchangeRequest onNotify={showToast} />
        </Section>

        <Section id="duvidas" title="Perguntas frequentes" description="Prazos, pagamento, trocas e garantia.">
          <Accordion items={FAQ_ACCORDION_ITEMS} defaultOpenId={FAQ_ACCORDION_ITEMS[0].id} />
        </Section>
      </main>

      <Footer credit="Loja fictícia criada para a atividade de React de Tópicos Avançados em Programação (UCSal, 2026.2)." />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}

export default App
