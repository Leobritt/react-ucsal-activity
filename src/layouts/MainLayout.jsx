import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.jsx'
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
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const previousPathname = useRef(pathname)

  // Numa aplicação de página única o navegador não recarrega ao trocar de rota,
  // então ele não volta ao topo nem avisa o leitor de tela sozinho. Este efeito
  // faz isso: rola para o topo e põe o foco no título (h1) da nova página.
  useEffect(() => {
    // Só age quando o caminho muda de verdade (não na primeira carga nem
    // quando muda apenas a parte ?pagina=2 da URL)
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    window.scrollTo(0, 0)
    const heading = mainRef.current?.querySelector('h1')
    if (heading) {
      heading.tabIndex = -1 // permite foco via código sem entrar na ordem do Tab
      heading.focus()
    }
  }, [pathname])

  return (
    <>
      {/* Primeiro elemento focável: permite pular o menu usando o teclado */}
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header links={NAVIGATION_LINKS} />

      <main id="conteudo" tabIndex={-1} ref={mainRef}>
        {/*
          Se a página quebrar, o cabeçalho e o rodapé continuam funcionando.
          key={pathname}: a cada página nova, um ErrorBoundary novo (sem o erro anterior).
        */}
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer credit="Loja fictícia criada para a atividade de React de Tópicos Avançados em Programação (UCSal, 2026.2)." />
    </>
  )
}

export default MainLayout
