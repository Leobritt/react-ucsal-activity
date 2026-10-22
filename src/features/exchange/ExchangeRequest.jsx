import { useEffect, useId, useRef, useState } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx'
import { formatFileSize } from '../../utils/format.js'
import styles from './ExchangeRequest.module.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const TICK_INTERVAL_MS = 200

/**
 * Formulário de solicitação de troca, com envio de foto SIMULADO.
 * Usa a BARRA DE PROGRESSO para mostrar o andamento do envio
 * e avisa o resultado com TOASTS.
 *
 * Props:
 *  - onNotify: função para mostrar um toast — recebe { type, message }
 */
function ExchangeRequest({ onNotify }) {
  // State do envio:
  //  file     → arquivo escolhido (ou null)
  //  progress → 0 a 100
  //  status   → 'idle' (parado) | 'uploading' | 'done' | 'canceled'
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle')
  const inputId = useId()
  const hintId = useId()
  // Referência ao <input type="file">, para limpá-lo no "Enviar outra foto"
  const fileInputRef = useRef(null)

  // Enquanto o status for "uploading", um timer soma um pouco ao progresso
  // a cada 200 ms. Quando chega a 100%, o próprio timer encerra o envio e
  // avisa com um toast. A função de limpeza (clearInterval) para o timer se
  // o status mudar antes (ex.: envio cancelado) ou se o componente sair da tela.
  useEffect(() => {
    if (status !== 'uploading') return

    let currentProgress = 0
    const intervalId = setInterval(() => {
      const step = 3 + Math.random() * 9 // passos irregulares, como uma rede de verdade
      currentProgress = Math.min(currentProgress + step, 100)
      setProgress(currentProgress)

      if (currentProgress === 100) {
        clearInterval(intervalId)
        setStatus('done')
        onNotify({
          type: 'success',
          message: 'Foto enviada. Vamos responder sua solicitação em até 2 dias úteis.',
        })
      }
    }, TICK_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [status, onNotify])

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    // Validações: tipo e tamanho do arquivo
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      onNotify({
        type: 'error',
        message: `"${selectedFile.name}" não é uma imagem aceita. Envie um arquivo JPG, PNG ou WEBP.`,
      })
      event.target.value = '' // limpa o campo para permitir escolher de novo
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      onNotify({
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
      onNotify({ type: 'warning', message: 'Escolha uma foto do produto antes de enviar.' })
      return
    }
    setProgress(0)
    setStatus('uploading')
  }

  function handleSubmit(event) {
    event.preventDefault() // impede o navegador de recarregar a página
    if (status !== 'uploading') startUpload()
  }

  function handleCancel() {
    setStatus('canceled')
    onNotify({ type: 'warning', message: 'Envio cancelado. A foto não foi enviada.' })
  }

  function handleReset() {
    setFile(null)
    setProgress(0)
    setStatus('idle')
    // O valor de um input de arquivo só pode ser limpo direto no elemento
    if (fileInputRef.current) fileInputRef.current.value = ''
    fileInputRef.current?.focus()
  }

  const isUploading = status === 'uploading'

  // Texto e cor da barra conforme o status
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

      {/* A barra só aparece depois que o envio começa */}
      {status !== 'idle' && <ProgressBar value={progress} label={progressLabel} tone={progressTone} />}

      {/*
        Os três botões ocupam o mesmo lugar, então o React reaproveita o mesmo
        elemento <button> e só troca texto e função. Por isso todos são type="button":
        se o tipo mudasse de "button" para "submit" durante o clique, o navegador
        enviaria o formulário logo depois (ex.: "Cancelar" recomeçaria o envio).
      */}
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
