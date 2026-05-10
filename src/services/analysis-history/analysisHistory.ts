import http from '../http'
import type { CommentAnalysisHistoryResponseDTO } from '../../types/api'
import type { HistoryItem } from '../../types/analyze'

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'agora'
  if (diffMin < 60) return `${diffMin}min atrás`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) return `${diffH}h atrás`
  const diffD = Math.floor(diffH / 24)
  if (diffD === 1) return 'ontem'
  if (diffD < 7) return `${diffD}d atrás`
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

export async function listMyHistory(): Promise<HistoryItem[]> {
  const data = await http.get<never, CommentAnalysisHistoryResponseDTO[]>('/analysis-history')
  return data.map((item) => ({
    id: item.id,
    label: item.label,
    verdict: item.verdict,
    createdAt: formatDate(item.createdAt),
    createdAtDate: item.createdAt,
  }))
}
