import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Section from './components/layout/Section.jsx'
import styles from './App.module.css'

// Links do menu principal: cada um aponta para o id de uma seção da página.
const NAVIGATION_LINKS = [
  { href: '#produtos', label: 'Produtos' },
  { href: '#detalhes', label: 'Detalhes' },
  { href: '#trocas', label: 'Trocas' },
  { href: '#duvidas', label: 'Dúvidas' },
]

/**
 * Componente principal. Ele orquestra a página: monta o layout
 * (cabeçalho, conteúdo e rodapé) e, nas próximas fases, vai guardar o
 * state compartilhado entre os componentes (produto selecionado, toasts...).
 */
function App() {
  return (
    <>
      {/* Primeiro elemento focável: permite pular o menu usando o teclado */}
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header links={NAVIGATION_LINKS} />

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
          <p className={styles.placeholder}>Menu suspenso e paginação entram na Fase 2.</p>
        </Section>

        <Section
          id="detalhes"
          title="Detalhes do produto"
          description="Descrição, especificações técnicas e avaliações de quem já comprou."
        >
          <p className={styles.placeholder}>Abas entram na Fase 2.</p>
        </Section>

        <Section
          id="trocas"
          title="Solicitar troca"
          description="Envie uma foto do produto com defeito para abrir a solicitação."
        >
          <p className={styles.placeholder}>Barra de progresso e notificações entram na Fase 2.</p>
        </Section>

        <Section
          id="duvidas"
          title="Perguntas frequentes"
          description="Prazos, pagamento, trocas e garantia."
        >
          <p className={styles.placeholder}>Acordeão entra na Fase 2.</p>
        </Section>
      </main>

      <Footer credit="Loja fictícia criada para a atividade de React de Tópicos Avançados em Programação (UCSal, 2026.2)." />
    </>
  )
}

export default App
