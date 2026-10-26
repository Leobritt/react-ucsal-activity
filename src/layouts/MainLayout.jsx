import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.jsx'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'

const NAVIGATION_LINKS = [
  { to: '/produtos', label: 'Produtos' },
  { to: '/trocas', label: 'Trocas' },
  { to: '/duvidas', label: 'Dúvidas' },
]

function MainLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    window.scrollTo(0, 0)
    const heading = mainRef.current?.querySelector('h1')
    if (heading) {
      heading.tabIndex = -1
      heading.focus()
    }
  }, [pathname])

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header links={NAVIGATION_LINKS} />

      <main id="conteudo" tabIndex={-1} ref={mainRef}>
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer credit="Loja fictícia criada para a atividade de React de Tópicos Avançados em Programação (UCSal, 2026.2)." />
    </>
  )
}

export default MainLayout
