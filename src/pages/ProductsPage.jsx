import Page from '../components/layout/Page.jsx'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import ProductCatalog from '../features/products/ProductCatalog.jsx'

/**
 * Página do catálogo (rota "/produtos").
 */
function ProductsPage() {
  return (
    <Page title="Produtos" description="Filtre por categoria, ordene e navegue pelas páginas do catálogo.">
      {/* Os cartões ficam logo abaixo do h1 da página, então o nome de cada produto é h2 */}
      <ProductCatalog products={PRODUCTS} categories={CATEGORIES} cardHeadingLevel={2} />
    </Page>
  )
}

export default ProductsPage
