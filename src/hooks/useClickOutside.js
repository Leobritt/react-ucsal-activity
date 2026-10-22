import { useEffect } from 'react'

/**
 * Hook personalizado: chama "onOutsideClick" quando o usuário clica/toca
 * fora do elemento apontado por "ref".
 * Usado pelo menu suspenso para fechar ao clicar fora dele.
 *
 * @param ref           referência (useRef) ao elemento que conta como "dentro"
 * @param onOutsideClick função chamada no clique fora
 * @param isEnabled     só escuta os cliques quando true (ex.: menu aberto)
 */
export function useClickOutside(ref, onOutsideClick, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    // Limpeza: remove o listener quando o menu fecha ou o componente sai da tela.
    // Sem isso, cada abertura do menu deixaria um listener "esquecido" no documento.
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, onOutsideClick, isEnabled])
}
