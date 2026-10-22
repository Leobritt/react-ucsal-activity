import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartProvider.jsx'
import ToastProvider from './context/ToastProvider.jsx'

// Ponto de entrada: monta o componente principal (App) dentro da <div id="root">.
// O StrictMode ajuda a encontrar problemas durante o desenvolvimento
// (por exemplo, efeitos sem limpeza) e não afeta a versão final.
// O BrowserRouter liga o React Router à barra de endereço do navegador.
// Os providers ficam em volta do App para que toda a aplicação acesse o state global.
// A ordem importa: o CartProvider fica dentro do ToastProvider porque usa useToast.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
