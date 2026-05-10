export const USE_CASES = [
  { kw: 'percepção pública', t: 'Entender percepção em notícias e temas de alta repercussão' },
  { kw: 'decisão', t: 'Apoio à tomada de decisão baseada em dados não estruturados' },
  { kw: 'anúncios', t: 'Medir reação do público sobre anúncios ou movimentações' },
  { kw: 'reputação', t: 'Monitoramento de reputação de marca' },
  { kw: 'campanha', t: 'Leitura rápida da reação pública a campanhas' },
  { kw: 'opinião', t: 'Analisar opinião sobre decisões publicadas' },
]

export const FEATURE_TAGS = [
  'prioriza o predominante',
  'não força equilíbrio',
  'volume + intensidade + recorrência',
  'ignora spam, piadas, off-topic',
]

export const EXAMPLE_URL = 'https://www.instagram.com/p/DXfIO8gChVa'

export const SAMPLE_HISTORY = [
  { id: 1, label: '/p/DXfIO8gChVa/', verdict: 'neg.', createdAt: 'agora', createdAtDate: '' },
  { id: 2, label: '/p/Dw3MkQ2/', verdict: 'pos.', createdAt: '2h atrás', createdAtDate: '' },
  { id: 3, label: '/p/Bv9NpR5/', verdict: 'misto', createdAt: 'ontem', createdAtDate: '' },
  { id: 4, label: '/p/Az1TkL8/', verdict: 'neg.', createdAt: '3d atrás', createdAtDate: '' },
]

export const SAMPLE_RESULT = `
  1. **Sentimento predominante do público:** Negativo.
  2. **Principais percepções recorrentes:** O público expressa insatisfação com a decisão do Tribunal de Justiça que suspendeu a alteração da data do feriado de aniversário de Maringá, defendendo que o feriado deveria permanecer no dia 10, que cai em um domingo. Há um sentimento geral de frustração em relação ao desinteresse das autoridades em considerar as necessidades dos trabalhadores, e muitos comentários sugerem uma crítica contundente à interferência do empresariado nas decisões que afetam o trabalhador.
  3. **Críticas relevantes:** As críticas se concentram na percepção de que os interesses dos trabalhadores estão sendo desconsiderados em prol dos comerciantes, além de questionamentos sobre a legitimidade da mudança da data do feriado. Há uma insatisfação com a forma como a situação foi tratada pelo legislativo e judiciário, sugerindo que o sistema favorece uma classe em detrimento da classe trabalhadora.
  4. **Elogios relevantes:** Elogios são raros, mas alguns comentários reconhecem a decisão do Judiciário como sensata e justificada, ainda que a maioria do público perceba essa decisão sob uma luz negativa.
  5. **Nível de engajamento percebido:** Alto. Muitos usuários expressam opiniões fortes e participam ativamente da discussão, compartilhando suas frustrações e propostas de boicote.
  6. **Conclusão estratégica:** Dada a forte insatisfação e o engajamento do público, é crucial que as autoridades locais considerem uma comunicação mais clara e uma abordagem proativa em relação às preocupações da comunidade, especialmente dos trabalhadores. Estar atento às demandas populares pode ajudar a restaurar a confiança nas instituições e a promover uma maior harmonia entre os interesses empresariais e os direitos dos trabalhadores. A falta de reconhecimento das necessidades da classe trabalhadora pode alimentar ainda mais descontentamento e desconfiança nas decisões futuras.
`
