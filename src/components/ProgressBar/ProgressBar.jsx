import { useId } from 'react'
import styles from './ProgressBar.module.css'

/**
 * BARRA DE PROGRESSO
 * Mostra visualmente quanto de uma tarefa já foi concluído.
 * O componente não calcula o progresso: só desenha o valor que recebe.
 *
 * Props:
 *  - value: progresso de 0 a 100
 *  - label: texto que descreve a tarefa (ex.: "Enviando foto.jpg")
 *  - showValue: mostra o percentual ao lado do texto (padrão: true)
 *  - tone: cor do preenchimento: 'default' | 'success' | 'error'
 *
 * Acessibilidade: role="progressbar" com aria-valuenow/min/max,
 * para leitores de tela anunciarem o percentual.
 */
function ProgressBar({ value, label, showValue = true, tone = 'default' }) {
  const labelId = useId()

  // Garante que o valor fique entre 0 e 100, mesmo se vier algo fora disso
  const clampedValue = Math.min(100, Math.max(0, value))
  const roundedValue = Math.round(clampedValue)

  return (
    <div className={styles.progress}>
      <div className={styles.header}>
        <span id={labelId} className={styles.label}>
          {label}
        </span>
        {showValue && (
          <span className={styles.value} aria-hidden="true">
            {roundedValue}%
          </span>
        )}
      </div>

      {/*
        O <progress> nativo é difícil de estilizar igual em todos os navegadores.
        Por isso usamos uma <div> com role="progressbar", que tem o mesmo significado
        para leitores de tela e deixa a largura do preenchimento sob nosso controle.
      */}
      <div
        className={styles.track}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedValue}
      >
        {/* A largura do preenchimento acompanha o valor recebido via props */}
        <div
          className={styles.fill}
          data-tone={tone}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
