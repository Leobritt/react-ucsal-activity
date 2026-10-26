import { Link, useParams } from 'react-router'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import Page from '../components/layout/Page.jsx'
import { PRODUCTS } from '../data/products.js'
import ProductDetails from '../features/products/ProductDetails.jsx'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === productId)

  if (!product) {
    return (
      <Page
        title="Produto não encontrado"
        description="O endereço pode estar errado ou o produto saiu do catálogo."
      >
        <Link to="/produtos" className="button button--primary">
          Ver todos os produtos
        </Link>
      </Page>
    )
  }

  return (
    <Page
      documentTitle={product.name}
      breadcrumb={
        <Breadcrumb
          items={[
            { label: 'Início', to: '/' },
            { label: 'Produtos', to: '/produtos' },
            { label: product.name },
          ]}
        />
      }
    >
      <ProductDetails product={product} headingLevel={1} />
    </Page>
  )
}

export default ProductDetailPage
