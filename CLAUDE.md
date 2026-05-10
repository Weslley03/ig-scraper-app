# Guia de desenvolvimento — ig-scraper-app

## Stack
React + Vite + TypeScript + Tailwind v4 (via CSS vars). Sem CSS-modules, sem styled-components.

## Estrutura de arquivos

```
src/
  pages/          # Uma página por arquivo. Apenas o componente principal vive aqui.
  components/     # Componentes reutilizáveis ou específicos de uma página.
    analyze/      # Sub-componentes da página Analyze
  types/          # Tipos e interfaces compartilhados
  services/       # Lógica de negócio assíncrona (API, scraping, etc.)
  constants/      # Dados estáticos e constantes
  hooks/          # Custom hooks
```

## Regra principal: sem componentes aninhados no mesmo arquivo

Cada componente com mais de ~15 linhas de JSX deve ter seu próprio arquivo.
Nunca defina `HistoryRail`, `StepsBar`, `ResultPanel`, etc. dentro do arquivo da página.

**Errado:**
```tsx
// src/pages/Analyze.tsx
function StepsBar() { ... }     // ❌ sub-componente no arquivo da página
export default function Analyze() { ... }
```

**Correto:**
```tsx
// src/components/analyze/StepsBar.tsx
export default function StepsBar() { ... }   // ✓ arquivo próprio

// src/pages/Analyze.tsx
import StepsBar from '../components/analyze/StepsBar'
export default function Analyze() { ... }
```

## Mocks e dados de exemplo

- **`SAMPLE_*` e `EXAMPLE_*`** são exclusivos do estado de preview/exemplo (`isPreview === true`).
- Fora do modo preview, nenhum dado falso deve aparecer em tela — nem no histórico, nem no painel de resultado.
- Para representar "nenhum dado ainda", renderize um estado vazio real (ex: `"nenhuma análise ainda"`).

```tsx
// ✓ correto
<HistoryRail items={isPreview ? SAMPLE_HISTORY : []} />

// ❌ errado
<HistoryRail items={SAMPLE_HISTORY} />
```

## Fluxos assíncronos

- Toda ação do usuário que dispara I/O deve ser `async/await` com tratamento de erro explícito.
- Nunca simule progresso com `setTimeout` no código de produção — isso pertence apenas a protótipos.
- Serviços vão em `src/services/`. A página apenas chama o serviço e trata o resultado.

```tsx
// ✓ correto
try {
  const text = await analyzePost(url, setStep)
  setResult(text)
} catch (err) {
  setError(err instanceof Error ? err.message : 'Erro desconhecido.')
}
```

## Validação de entrada

- Valide na borda do sistema (input do usuário), nunca confie em dados não validados.
- URLs do Instagram devem ser testadas com regex antes de disparar qualquer requisição.

```ts
const IG_URL_RE = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?/
```

## Tipos

- Tipos compartilhados entre página e sub-componentes ficam em `src/types/`.
- Nunca redefina o mesmo tipo em dois arquivos.
