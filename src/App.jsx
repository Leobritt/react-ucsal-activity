import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import ExchangePage from './pages/ExchangePage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'

/**
 * Componente principal. Orquestra a aplicação definindo as rotas:
 * qual página aparece para cada endereço.
 *
 * Todas as rotas ficam dentro do MainLayout (cabeçalho + rodapé), e a página
 * da rota atual aparece no <Outlet /> do layout.
 *
 * Carrinho e notificações são state global (Context API, ver main.jsx):
 * cada componente que precisa deles usa os hooks useCart e useToast.
 */
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<ProductsPage />} />
        {/* ":productId" é um parâmetro: /produtos/multimeter, /produtos/servo-9g... */}
        <Route path="produtos/:productId" element={<ProductDetailPage />} />
        <Route path="trocas" element={<ExchangePage />} />
        <Route path="duvidas" element={<FaqPage />} />
      </Route>
    </Routes>
  )
}

export default App
