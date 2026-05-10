export type Step = 'idle' | 'extracting' | 'filtering' | 'analyzing' | 'done'

export interface HistoryItem {
  id: number
  label: string
  verdict: string
  createdAt: string
  createdAtDate: string
}
