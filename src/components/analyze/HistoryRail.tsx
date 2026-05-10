import { useMemo, useState } from 'react'
import type { HistoryItem } from '../../types/analyze'

interface Props {
  items: HistoryItem[]
  loading?: boolean
  setAnalysis: (analysisId: number) => void
}

export default function HistoryRail({ items, loading, setAnalysis }: Props) {
  const [visibleCount, setVisibleCount] = useState(5)

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      return new Date(b.createdAtDate).getTime() - new Date(a.createdAtDate).getTime()
    })
  }, [items])

  const visibleItems = sortedItems.slice(0, visibleCount)
  const hasMore = visibleCount < sortedItems.length

  function handleShowMore() {
    setVisibleCount((prev) => prev + 5)
  }

  function handleSelect(id: number) {
    setSelectedId(id)
    setAnalysis(id)
  }

  return (
    <div
      style={{
        borderRight: '1px dashed var(--color-border-default)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        overflowY: 'auto',
        maxHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          histórico
        </span>

        {items.length > 0 && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--color-primary)',
              border: '1px dashed var(--color-primary)',
              borderRadius: 4,
              padding: '1px 5px',
            }}
          >
            {items.length}
          </span>
        )}
      </div>

      {loading ? (
        <>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                height: 38,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-bg-secondary)',
                border: '1px dashed var(--color-border-default)',
                opacity: 0.5,
              }}
            />
          ))}
        </>
      ) : items.length === 0 ? (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: 'var(--color-text-muted)',
            marginTop: 4,
          }}
        >
          nenhuma análise ainda.
        </span>
      ) : (
        <>
          {visibleItems.map((h) => (
            <div
              key={h.id}
              onClick={() => handleSelect(h.id)}
              onMouseEnter={() => setHoveredId(h.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: '6px 8px',
                border: '1px dashed var(--color-border-default)',
                borderRadius: 'var(--radius-sm)',
                background: selectedId === h.id ? 'var(--color-bg-secondary)' : 'transparent',
                transform: hoveredId === h.id ? 'scale(1.00) translateY(-1px)' : 'scale(1)',
                boxShadow: hoveredId === h.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--color-text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {h.label}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {h.createdAt}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color:
                      h.verdict === 'pos.'
                        ? 'var(--color-success)'
                        : h.verdict === 'neg.'
                          ? 'var(--color-danger)'
                          : 'var(--color-text-muted)',
                  }}
                >
                  {h.verdict}
                </span>
              </div>
            </div>
          ))}

          {hasMore && (
            <span
              onClick={handleShowMore}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--color-text-muted)',
                marginTop: 4,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              + ver mais
            </span>
          )}
        </>
      )}
    </div>
  )
}
