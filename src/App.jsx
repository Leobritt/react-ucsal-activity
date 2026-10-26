import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import CartPage from './pages/CartPage.jsx'
import ExchangePage from './pages/ExchangePage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="produtos/:productId" element={<ProductDetailPage />} />
        <Route path="trocas" element={<ExchangePage />} />
        <Route path="duvidas" element={<FaqPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
