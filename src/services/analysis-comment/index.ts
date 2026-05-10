import type { AnalysisComment } from '../../types/analyze-comment'
import http from '../http'

export async function getAnalysisById(analysisId: number): Promise<AnalysisComment> {
  const data = await http.get<never, AnalysisComment>('/analysis-comment', {
    params: { analysisId: analysisId },
  })

  return {
    id: data.id,
    igUrl: data.igUrl,
    descriptionContent: data.descriptionContent,
    result: data.result,
    createdAt: data.createdAt,
  }
}
