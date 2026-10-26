import { useId } from 'react'
import styles from './ProgressBar.module.css'

function ProgressBar({ value, label, showValue = true, tone = 'default' }) {
  const labelId = useId()

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

      <div
        className={styles.track}
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedValue}
      >
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
