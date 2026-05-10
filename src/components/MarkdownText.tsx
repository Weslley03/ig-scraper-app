import type { ReactNode } from 'react'

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part))
}

interface Props {
  text: string
  style?: React.CSSProperties
}

export default function MarkdownText({ text, style }: Props) {
  const lines = text.split('\n').filter((l) => l.trim() !== '')
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        lineHeight: 1.65,
        color: 'var(--color-text-primary)',
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <p key={i} style={{ margin: i === 0 ? 0 : '8px 0 0' }}>
          {parseBold(line)}
        </p>
      ))}
    </div>
  )
}
