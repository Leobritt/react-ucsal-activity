import { Link } from 'react-router'
import Section from '../components/layout/Section.jsx'
import { PRODUCTS } from '../data/products.js'
import ProductCard from '../features/products/ProductCard.jsx'
import styles from './HomePage.module.css'

const TOP_RATED_PRODUCTS = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 4)

function HomePage() {
  return (
    <>
      <title>Circuito | Eletrônicos para makers</title>

      <section aria-labelledby="hero-title" className={styles.hero}>
        <div className="container">
          <h1 id="hero-title" className={styles.heroTitle}>
            Placas, sensores e ferramentas para tirar o projeto da protoboard.
          </h1>
          <p className={styles.heroText}>
            A Circuito é uma loja fictícia de eletrônicos para estudantes e makers.
            Escolha os componentes, compare as especificações e acompanhe sua troca
            por aqui.
          </p>
          <div className={styles.heroActions}>
            <Link to="/produtos" className="button button--primary">
              Ver produtos
            </Link>
            <Link to="/duvidas" className="button button--secondary">
              Tirar dúvidas
            </Link>
          </div>
        </div>

        <svg className={styles.trace} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.traceLine} d="M0 60 H420 L460 20 H900 L930 50 H1200" />
          <path className={styles.padOuter} d="M460 20 h0.01 M930 50 h0.01" />
          <path className={styles.padInner} d="M460 20 h0.01 M930 50 h0.01" />
        </svg>
      </section>

      <Section
        id="destaques"
        title="Mais bem avaliados"
        description="Os produtos com as melhores notas de quem já comprou."
      >
        <ul className={styles.grid}>
          {TOP_RATED_PRODUCTS.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link to="/produtos">Ver todos os produtos</Link>
        </p>
      </Section>
    </>
  )
}

export default HomePage
