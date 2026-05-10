import type { ReactNode, CSSProperties } from 'react'

interface BrowserWindowProps {
  children: ReactNode
  url?: string
  maxWidth?: number
  style?: CSSProperties
}

export default function BrowserWindow({
  children,
  url = 'ig-comments-analyzer.app',
  maxWidth = 900,
  style,
}: BrowserWindowProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth,
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
        boxShadow: 'var(--shadow-lg)',
        ...style,
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border-default)',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 20,
            padding: '3px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--color-text-muted)',
            textAlign: 'center',
          }}
        >
          {url}
        </div>
        <div style={{ width: 60 }} />
      </div>

      {children}
    </div>
  )
}
