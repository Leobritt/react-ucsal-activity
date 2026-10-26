import { Link } from 'react-router'
import Page from '../components/layout/Page.jsx'

function NotFoundPage() {
  return (
    <Page title="Página não encontrada" description="Confira o endereço digitado ou volte para o início.">
      <Link to="/" className="button button--primary">
        Ir para o início
      </Link>
    </Page>
  )
}

export default NotFoundPage
