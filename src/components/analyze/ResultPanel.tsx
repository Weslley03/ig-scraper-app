import MarkdownText from '../MarkdownText'

interface Props {
  text: string
}

export default function ResultPanel({ text }: Props) {
  return (
    <div
      style={{
        flex: 1,
        padding: 16,
        border: '1px dashed var(--color-border-default)',
        borderRadius: 'var(--radius-md)',
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: -9,
          left: 14,
          background: 'var(--color-bg-primary)',
          padding: '0 6px',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--color-primary)',
          border: '1px dashed var(--color-primary)',
          borderRadius: 3,
        }}
      >
        resultado.md
      </span>
      <MarkdownText text={text} />
    </div>
  )
}
