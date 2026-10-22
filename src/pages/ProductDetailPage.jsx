import { Link, useParams } from 'react-router'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import Page from '../components/layout/Page.jsx'
import { PRODUCTS } from '../data/products.js'
import ProductDetails from '../features/products/ProductDetails.jsx'

/**
 * Página de um produto (rota "/produtos/:productId").
 * O useParams lê o pedaço dinâmico da URL: em /produtos/multimeter,
 * productId vale "multimeter".
 */
function ProductDetailPage() {
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === productId)

  // URL com um id que não existe: mostra uma mensagem em vez de quebrar a página
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
      {/* Aqui o nome do produto é o título principal da página (h1) */}
      <ProductDetails product={product} headingLevel={1} />
    </Page>
  )
}

export default ProductDetailPage
