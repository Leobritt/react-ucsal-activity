import { Outlet } from 'react-router'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'

// Links do menu principal: cada um aponta para uma rota (página)
const NAVIGATION_LINKS = [
  { to: '/produtos', label: 'Produtos' },
  { to: '/trocas', label: 'Trocas' },
  { to: '/duvidas', label: 'Dúvidas' },
]

/**
 * Layout comum a todas as páginas: cabeçalho, conteúdo e rodapé.
 * O <Outlet /> do React Router é o "espaço" onde a página da rota atual aparece.
 * Assim, cabeçalho e rodapé não são recriados ao trocar de página.
 */
function MainLayout() {
  return (
    <>
      {/* Primeiro elemento focável: permite pular o menu usando o teclado */}
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header links={NAVIGATION_LINKS} />

      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer credit="Loja fictícia criada para a atividade de React de Tópicos Avançados em Programação (UCSal, 2026.2)." />
    </>
  )
}

export default MainLayout
