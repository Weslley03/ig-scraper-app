import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrowserWindow from '../components/BrowserWindow'
import StartModal from '../components/StartModal'
import { useIsMobile } from '../hooks/useIsMobile'
import { USE_CASES, FEATURE_TAGS } from '../constants/home'

export default function Home() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [showStartModal, setShowStartModal] = useState(false)

  return (
    <>
      <StartModal open={showStartModal} onClose={() => setShowStartModal(false)} />

      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 16px 48px',
        }}
      >
        <BrowserWindow>
          <div style={{ padding: '20px 28px 28px' }}>
            {/* Topbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 14,
                borderBottom: '1px dashed var(--color-border-default)',
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: 'var(--color-primary)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  ig·comments·analyzer
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--color-text-muted)',
                }}
              >
                {!isMobile && <span style={{ cursor: 'pointer' }}>sobre</span>}
                {!isMobile && <span style={{ cursor: 'pointer' }}>como&nbsp;funciona</span>}
                <span
                  style={{ color: 'var(--color-text-primary)', cursor: 'pointer', fontWeight: 600 }}
                  onClick={() => navigate('/access')}
                >
                  entrar →
                </span>
              </div>
            </div>

            {/* Hero */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
                gap: 32,
                alignItems: 'start',
              }}
            >
              <div
                style={
                  isMobile
                    ? {
                        textAlign: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                      }
                    : undefined
                }
              >
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    margin: '0 0 8px',
                    lineHeight: 1.25,
                    letterSpacing: '-.01em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Leia os comentários antes de tirar conclusões.
                </h1>

                <svg width={130} height={8} style={{ marginBottom: 14, display: 'block' }}>
                  <path
                    d="M0 5 Q16 1 32 5 Q48 9 64 5 Q80 1 96 5 Q112 9 128 5"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth={1.5}
                    opacity={0.5}
                  />
                </svg>

                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--color-text-secondary)',
                    maxWidth: 360,
                    margin: '0 0 20px',
                    lineHeight: 1.65,
                  }}
                >
                  Cole o link de uma publicação pública no Instagram. Extraímos os comentários e
                  devolvemos uma análise de sentimento honesta, sem forçar equilíbrio entre elogios
                  e críticas.
                </p>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowStartModal(true)}
                    style={{
                      padding: '8px 16px',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '.05em',
                      cursor: 'pointer',
                      transition: 'background var(--motion-fast)',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background =
                        'var(--color-primary-hover)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background =
                        'var(--color-primary)'
                    }}
                  >
                    começar análise →
                  </button>
                  <button
                    onClick={() => navigate('/analyze', { state: { isPreview: true } })}
                    style={{
                      padding: '8px 14px',
                      background: 'transparent',
                      border: '1px dashed var(--color-border-default)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    ver exemplo
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                  {FEATURE_TAGS.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        color: 'var(--color-text-muted)',
                        border: '1px dashed var(--color-border-default)',
                        borderRadius: 20,
                        padding: '2px 8px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Use cases */}
            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: '1px dashed var(--color-border-default)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <h2
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    margin: 0,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  para que serve
                </h2>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {`0${USE_CASES.length}+`} · casos de uso
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                  columnGap: 24,
                  rowGap: 0,
                }}
              >
                {USE_CASES.map((u, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                      padding: '10px 0',
                      borderBottom: '1px dashed var(--color-border-default)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'var(--color-primary)',
                        paddingTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.4,
                        }}
                      >
                        {u.t}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          color: 'var(--color-text-muted)',
                          marginTop: 3,
                          letterSpacing: '.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        #{u.kw}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserWindow>
      </div>
    </>
  )
}
