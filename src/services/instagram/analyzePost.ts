import { getAnalysis } from './instagram'

export async function analyzePost(url: string): Promise<string> {
  return await getAnalysis(url)
}
