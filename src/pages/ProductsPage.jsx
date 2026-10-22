import Page from '../components/layout/Page.jsx'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import ProductCatalog from '../features/products/ProductCatalog.jsx'

/**
 * Página do catálogo (rota "/produtos").
 */
function ProductsPage() {
  return (
    <Page title="Produtos" description="Filtre por categoria, ordene e navegue pelas páginas do catálogo.">
      <ProductCatalog products={PRODUCTS} categories={CATEGORIES} />
    </Page>
  )
}

export default ProductsPage
