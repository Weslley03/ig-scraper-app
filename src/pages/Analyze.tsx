import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { Step, HistoryItem } from '../types/analyze'
import { useAuthStore } from '../store/authStore'
import { analyzePost } from '../services/instagram/analyzePost'
import { listMyHistory } from '../services/analysis-history/analysisHistory'
import { SAMPLE_HISTORY, SAMPLE_RESULT, EXAMPLE_URL } from '../constants/home'
import HistoryRail from '../components/analyze/HistoryRail'
import StepsBar from '../components/analyze/StepsBar'
import ResultPanel from '../components/analyze/ResultPanel'
import EmptyPanel from '../components/analyze/EmptyPanel'
import { getAnalysisById } from '../services/analysis-comment'
import type { AnalysisComment } from '../types/analyze-comment'

const IG_URL_RE = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?/

export default function Analyze() {
  const location = useLocation()
  const isPreview = !!(location.state as { isPreview?: boolean } | null)?.isPreview

  const [url, setUrl] = useState(isPreview ? EXAMPLE_URL : '')
  const [step, setStep] = useState<Step>(isPreview ? 'done' : 'idle')
  const [result, setResult] = useState<string | null>(isPreview ? SAMPLE_RESULT : null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyLoading, setHistoryLoading] = useState(!isPreview)

  const analysisCache = useRef<Map<number, AnalysisComment>>(new Map())

  // actions options
  const [copyText, setCopyText] = useState('copiar')
  const [actionsHoveredId, setActionsHoveredId] = useState<number | null>(null)

  useEffect(() => {
    if (isPreview) return
    listMyHistory()
      .then(setHistory)
      .catch(() => {})
      .finally(() => setHistoryLoading(false))
  }, [isPreview])

  async function clickOnAction(action: string) {
    switch (action) {
      case 'copiar': {
        if (!result?.trim()) return
        await navigator.clipboard.writeText(result)
        setCopyText('copiado!')
        setTimeout(() => {
          setCopyText('copiar')
        }, 2000)
        break
      }
      case 'exportar .md': {
        break
      }
      case 'exportar .pdf': {
        break
      }
      case 'limpar': {
        setStep('idle')
        setResult(null)
        setUrl('')
        break
      }
      default: {
        console.warn(`ação inválida. {${action}}`)
      }
    }
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  async function setAnalyze(analyzeId: number) {
    try {
      setLoading(true)
      setError(null)

      const cachedAnalysis = analysisCache.current.get(analyzeId)

      if (cachedAnalysis) {
        setStep('done')

        setResult(cachedAnalysis.result)
        setUrl(cachedAnalysis.igUrl)

        return
      }

      setResult(null)
      setUrl('')

      const analyze = await getAnalysisById(analyzeId)

      analysisCache.current.set(analyzeId, analyze)

      setStep('done')

      setResult(analyze.result)
      setUrl(analyze.igUrl)
    } catch (err) {
      console.error(err)

      setError(err instanceof Error ? err.message : 'Erro desconhecido.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAnalyze(e: { preventDefault(): void }) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return

    if (!IG_URL_RE.test(trimmed)) {
      setError('URL inválida — use uma URL de post do Instagram (instagram.com/p/…).')
      return
    }

    setError(null)
    setResult(null)
    setLoading(true)

    try {
      setLoading(true)
      setError(null)

      // etapa 1
      setStep('extracting')
      await delay(1200)

      // etapa 2
      setStep('filtering')
      await delay(1200)

      // chamada principal
      const text = await analyzePost(trimmed)

      // etapa 3
      setStep('analyzing')
      await delay(1200)

      // final
      setResult(text)
      setStep('done')
    } catch (err) {
      setStep('idle')
      setError(err instanceof Error ? err.message : 'Erro desconhecido.')
    } finally {
      setLoading(false)
    }
  }

  const authLogout = useAuthStore((s) => s.logout)

  function handleLogout() {
    authLogout()
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 16px',
          borderBottom: '1px dashed var(--color-border-default)',
          background: 'var(--color-bg-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--color-primary)' }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em' }}>
            ig·comments·analyzer
          </span>
        </div>

        <form onSubmit={handleAnalyze} style={{ flex: 1, display: 'flex', gap: 8 }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 12px',
              background: 'var(--color-bg-primary)',
              border: '1px dashed var(--color-border-default)',
              borderRadius: 20,
            }}
          >
            {isPreview && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: 'var(--color-primary)',
                  border: '1px dashed var(--color-primary)',
                  borderRadius: 3,
                  padding: '1px 5px',
                  whiteSpace: 'nowrap',
                }}
              >
                exemplo
              </span>
            )}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="cole a url do instagram aqui..."
              readOnly={isPreview}
              spellCheck={false}
              autoCorrect="off"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
            />
          </div>
          {!isPreview && (
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '5px 14px',
                background: loading ? 'var(--color-border-default)' : 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 20,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '.05em',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '...' : 'analisar ↵'}
            </button>
          )}
        </form>

        <span
          onClick={handleLogout}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
          }}
        >
          sair
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
        }}
      >
        <HistoryRail
          items={isPreview ? SAMPLE_HISTORY : history}
          loading={historyLoading}
          setAnalysis={setAnalyze}
        />

        {/* Analysis panel */}
        <div
          style={{
            height: '90%',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              análise
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {[copyText, 'exportar .md', 'exportar .pdf', 'limpar'].map((label, i) => (
                <button
                  key={label}
                  onClick={() => clickOnAction(label)}
                  onMouseEnter={() => setActionsHoveredId(i)}
                  onMouseLeave={() => setActionsHoveredId(null)}
                  style={{
                    padding: '3px 8px',
                    background: 'transparent',
                    border: '1px dashed var(--color-border-default)',
                    borderRadius: 3,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'var(--color-text-muted)',
                    transform: actionsHoveredId === i ? 'scale(1.00) translateY(-1px)' : 'scale(1)',
                    boxShadow: actionsHoveredId === i ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <StepsBar step={step} />

          {step === 'done' && result ? (
            <ResultPanel text={result} />
          ) : (
            <EmptyPanel step={step} error={error} />
          )}
        </div>
      </div>
    </div>
  )
}
