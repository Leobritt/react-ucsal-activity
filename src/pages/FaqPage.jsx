import Accordion from '../components/Accordion/Accordion.jsx'
import Page from '../components/layout/Page.jsx'
import { FAQ_ITEMS } from '../data/faq.js'

// O acordeão espera { id, title, content }; aqui adaptamos o formato das perguntas
const FAQ_ACCORDION_ITEMS = FAQ_ITEMS.map((item) => ({
  id: item.id,
  title: item.question,
  content: item.answer,
}))

/**
 * Página de perguntas frequentes (rota "/duvidas").
 */
function FaqPage() {
  return (
    <Page title="Perguntas frequentes" description="Prazos, pagamento, trocas e garantia.">
      <Accordion items={FAQ_ACCORDION_ITEMS} defaultOpenId={FAQ_ACCORDION_ITEMS[0].id} />
    </Page>
  )
}

export default FaqPage
