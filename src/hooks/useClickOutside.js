import { useEffect } from 'react'

export function useClickOutside(ref, onOutsideClick, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, onOutsideClick, isEnabled])
}
