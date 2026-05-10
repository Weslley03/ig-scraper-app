import type { Step } from '../../types/analyze'

interface Props {
  step: Step
  error?: string | null
}

const LOADING_STEPS: Step[] = ['extracting', 'filtering', 'analyzing']

export default function EmptyPanel({ step, error }: Props) {
  const isLoading = !error && LOADING_STEPS.includes(step)

  const message = error
    ? error
    : step === 'idle'
      ? 'cole uma URL acima para começar a análise'
      : 'processando...'

  return (
    <div
      style={{
        flex: 1,
        border: `1px dashed ${error ? 'var(--color-danger)' : 'var(--color-border-default)'}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
      }}
    >
      {isLoading && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '2px solid var(--color-border-default)',
            borderTopColor: 'var(--color-primary)',
            animation: 'spin 700ms linear infinite',
          }}
        />
      )}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: error ? 'var(--color-danger)' : 'var(--color-text-muted)',
          textAlign: 'center',
        }}
      >
        {message}
      </span>
    </div>
  )
}
