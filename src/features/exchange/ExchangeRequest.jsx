import { useEffect, useId, useRef, useState } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx'
import { useToast } from '../../hooks/useToast.js'
import { formatFileSize } from '../../utils/format.js'
import styles from './ExchangeRequest.module.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const TICK_INTERVAL_MS = 200

function ExchangeRequest() {
  const { showToast } = useToast()

  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle')
  const inputId = useId()
  const hintId = useId()
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (status !== 'uploading') return

    let currentProgress = 0
    const intervalId = setInterval(() => {
      const step = 3 + Math.random() * 9
      currentProgress = Math.min(currentProgress + step, 100)
      setProgress(currentProgress)

      if (currentProgress === 100) {
        clearInterval(intervalId)
        setStatus('done')
        showToast({
          type: 'success',
          message: 'Foto enviada. Vamos responder sua solicitação em até 2 dias úteis.',
        })
      }
    }, TICK_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [status, showToast])

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      showToast({
        type: 'error',
        message: `"${selectedFile.name}" não é uma imagem aceita. Envie um arquivo JPG, PNG ou WEBP.`,
      })
      event.target.value = ''
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      showToast({
        type: 'error',
        message: `A foto tem ${formatFileSize(selectedFile.size)}. O limite é 5 MB.`,
      })
      event.target.value = ''
      return
    }

    setFile(selectedFile)
    setProgress(0)
    setStatus('idle')
  }

  function startUpload() {
    if (!file) {
      showToast({ type: 'warning', message: 'Escolha uma foto do produto antes de enviar.' })
      return
    }
    setProgress(0)
    setStatus('uploading')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (status !== 'uploading') startUpload()
  }

  function handleCancel() {
    setStatus('canceled')
    showToast({ type: 'warning', message: 'Envio cancelado. A foto não foi enviada.' })
  }

  function handleReset() {
    setFile(null)
    setProgress(0)
    setStatus('idle')
    if (fileInputRef.current) fileInputRef.current.value = ''
    fileInputRef.current?.focus()
  }

  const isUploading = status === 'uploading'

  const progressLabel = {
    uploading: `Enviando ${file?.name}`,
    done: `${file?.name} enviada`,
    canceled: 'Envio cancelado',
  }[status]

  const progressTone = { done: 'success', canceled: 'error' }[status] ?? 'default'

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor={inputId} className={styles.label}>
          Foto do produto
        </label>
        <p id={hintId} className={styles.hint}>
          JPG, PNG ou WEBP, até 5 MB. O envio é simulado: o arquivo não sai do seu computador.
        </p>
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          aria-describedby={hintId}
          className={styles.input}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {file && (
          <p className={styles.fileInfo}>
            Selecionado: <strong>{file.name}</strong> ({formatFileSize(file.size)})
          </p>
        )}
      </div>

      {status !== 'idle' && <ProgressBar value={progress} label={progressLabel} tone={progressTone} />}

      <div className={styles.actions}>
        {isUploading ? (
          <button type="button" className="button button--secondary" onClick={handleCancel}>
            Cancelar envio
          </button>
        ) : status === 'done' ? (
          <button type="button" className="button button--secondary" onClick={handleReset}>
            Enviar outra foto
          </button>
        ) : (
          <button type="button" className="button button--primary" onClick={startUpload}>
            {status === 'canceled' ? 'Tentar de novo' : 'Enviar foto'}
          </button>
        )}
      </div>
    </form>
  )
}

export default ExchangeRequest
