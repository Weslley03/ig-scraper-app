import http from '../http'

const IG_URL_RE = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?/

function isValidUrl(url: string) {
  if (!IG_URL_RE.test(url)) {
    throw new Error('URL inválida — use uma URL de post do Instagram (instagram.com/p/…).')
  }
}

export async function getAnalysis(url: string): Promise<string> {
  isValidUrl(url)
  return http.get('/instagram/comments', { params: { url } })
}
