import type { Step } from '../../types/analyze'

const STEPS: { key: Exclude<Step, 'idle' | 'done'>; label: string }[] = [
  { key: 'extracting', label: 'extraindo comentários' },
  { key: 'filtering', label: 'identificando padrões' },
  { key: 'analyzing', label: 'analisando' },
]

function stepState(current: Step, target: Step): 'done' | 'active' | 'pending' {
  const order: Step[] = ['extracting', 'filtering', 'analyzing', 'done']
  const ci = order.indexOf(current)
  const ti = order.indexOf(target)
  if (ti < ci) return 'done'
  if (ti === ci) return 'active'
  return 'pending'
}

interface Props {
  step: Step
}

export default function StepsBar({ step }: Props) {
  if (step === 'idle') return null
  return (
    <div
      style={{
        padding: '8px 12px',
        background: 'var(--color-bg-secondary)',
        border: '1px dashed var(--color-border-default)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
        {STEPS.map(({ key, label }, i) => {
          const state = stepState(step, key)
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 8px',
                  borderRadius: 20,
                  border: `1px dashed ${
                    state === 'done'
                      ? 'var(--color-success)'
                      : state === 'active'
                        ? 'var(--color-primary)'
                        : 'var(--color-border-default)'
                  }`,
                  background:
                    state === 'done'
                      ? 'rgba(34,197,94,.08)'
                      : state === 'active'
                        ? 'rgba(90,78,200,.08)'
                        : 'transparent',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color:
                      state === 'done'
                        ? 'var(--color-success)'
                        : state === 'active'
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                  }}
                >
                  {state === 'done' ? '✓' : i + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color:
                      state === 'done'
                        ? 'var(--color-success)'
                        : state === 'active'
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                  }}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div style={{ width: 16, height: 1, background: 'var(--color-border-default)' }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
