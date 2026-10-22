import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToastProvider from './context/ToastProvider.jsx'

// Ponto de entrada: monta o componente principal (App) dentro da <div id="root">.
// O StrictMode ajuda a encontrar problemas durante o desenvolvimento
// (por exemplo, efeitos sem limpeza) e não afeta a versão final.
// Os providers ficam em volta do App para que toda a aplicação acesse o state global.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
