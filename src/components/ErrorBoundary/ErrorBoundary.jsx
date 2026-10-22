import { Component } from 'react'
import { Link } from 'react-router'
import styles from './ErrorBoundary.module.css'

/**
 * ERROR BOUNDARY — componente de CLASSE.
 *
 * Se algum componente dentro dele quebrar durante a renderização, em vez de a
 * tela inteira ficar em branco, ele mostra uma mensagem com opções para continuar.
 *
 * Por que classe? O React só oferece esse recurso para componentes de classe:
 * os métodos getDerivedStateFromError e componentDidCatch não têm equivalente em hooks.
 *
 * Props:
 *  - children: conteúdo protegido
 *
 * Para esquecer o erro ao trocar de página, quem usa passa key={endereço}:
 * quando a key muda, o React cria um ErrorBoundary novo, com o state zerado.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    // Em classes, o state é um objeto em this.state (não existe useState)
    this.state = { hasError: false }
  }

  // Chamado quando um filho lança um erro: o retorno vira o novo state
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // Chamado depois do erro, bom para registrar o que aconteceu
  componentDidCatch(error, info) {
    console.error('Erro capturado pelo ErrorBoundary:', error, info.componentStack)
  }

  // Arrow function como propriedade da classe: o "this" fica ligado ao componente
  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className={styles.fallback}>
        <div className="container">
          <h1 className={styles.title}>Algo deu errado nesta página</h1>
          <p className={styles.text}>
            Tente carregar de novo. Se continuar, volte para o início e siga por outro caminho.
          </p>
          <div className={styles.actions}>
            <button type="button" className="button button--primary" onClick={this.handleRetry}>
              Tentar de novo
            </button>
            <Link to="/" className="button button--secondary">
              Ir para o início
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
