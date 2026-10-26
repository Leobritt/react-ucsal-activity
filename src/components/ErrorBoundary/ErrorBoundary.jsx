import { Component } from 'react'
import { Link } from 'react-router'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Erro capturado pelo ErrorBoundary:', error, info.componentStack)
  }

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
