import { useNavigate } from 'react-router-dom'
import Modal from './Modal'

interface StartModalProps {
  open: boolean
  onClose: () => void
}

export default function StartModal({ open, onClose }: StartModalProps) {
  const navigate = useNavigate()

  function goTo(path: string) {
    onClose()
    if (path === '/analyze') {
      navigate('/analyze', { state: { isPreview: true } })
    } else {
      navigate(path)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: '22px 22px 18px' }}>
        {/* Tag */}
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            margin: '0 0 6px',
            lineHeight: 1.25,
            color: 'var(--color-text-primary)',
          }}
        >
          antes de começar
        </h2>

        <p
          style={{
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            margin: '0 0 16px',
            maxWidth: 380,
            lineHeight: 1.6,
          }}
        >
          Crie uma conta pra acompanhar seu histórico e salvar resultados, ou veja antes um exemplo
          real, sem cadastro.
        </p>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={() => goTo('/access')}
            style={{
              padding: '14px 12px',
              background: 'var(--color-primary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              textAlign: 'left',
              transition: 'background var(--motion-fast)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.background =
                'var(--color-primary-hover)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: '#fff',
                letterSpacing: '.04em',
              }}
            >
              cadastrar →
            </span>
          </button>

          <button
            onClick={() => goTo('/analyze')}
            style={{
              padding: '14px 12px',
              background: 'transparent',
              border: '1px dashed var(--color-border-default)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              textAlign: 'left',
              transition: 'border-color var(--motion-fast)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                'var(--color-border-default)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--color-primary)',
                letterSpacing: '.04em',
              }}
            >
              abrir exemplo →
            </span>
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px dashed var(--color-border-default)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--color-text-muted)',
            }}
          >
            já tem conta?{' '}
            <span
              onClick={() => goTo('/access')}
              style={{
                color: 'var(--color-text-primary)',
                borderBottom: '1px dashed var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              entrar
            </span>
          </span>
        </div>
      </div>
    </Modal>
  )
}
