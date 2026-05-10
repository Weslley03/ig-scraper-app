import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  width?: number | string
}

export default function Modal({ open, onClose, children, width = 460 }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(20, 20, 40, 0.42)',
        backdropFilter: 'blur(2px)',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: '100%',
          background: 'var(--color-bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 12px 40px rgba(20, 20, 50, 0.18)',
          position: 'relative',
          animation: 'modal-in var(--motion-normal) ease',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            border: 0,
            background: 'transparent',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            width: 22,
            height: 22,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
          aria-label="Fechar"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
