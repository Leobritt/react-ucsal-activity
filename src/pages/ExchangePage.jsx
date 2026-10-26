import Page from '../components/layout/Page.jsx'
import ExchangeRequest from '../features/exchange/ExchangeRequest.jsx'

function ExchangePage() {
  return (
    <Page
      title="Solicitar troca"
      description="Recebeu um produto com defeito? Envie uma foto para abrir a solicitação."
    >
      <ExchangeRequest />
    </Page>
  )
}

export default ExchangePage
