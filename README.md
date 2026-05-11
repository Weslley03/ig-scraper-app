# ig·comments·analyzer

Ferramenta web que extrai os comentários de uma publicação pública do Instagram e devolve uma análise de sentimento honesta, sem forçar equilíbrio artificial entre elogios e críticas.

---

### Home

> imagem-home

### Análise concluída

> a imagem-análise

---

## Como funciona

1. Cole o link de um post, reel ou IGTV público.
2. A aplicação extrai e filtra os comentários via API.
3. Um modelo de linguagem analisa o sentimento predominante e devolve um resumo em markdown.
4. O resultado fica salvo no histórico para consultas futuras.

---

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS v4 (CSS vars) |
| Formulários | React Hook Form + Zod |
| Estado global | Zustand |
| HTTP | Axios |
| Roteamento | React Router v7 |
| Deploy | Vercel |

---

## Funcionalidades

- **Análise de sentimento**: resumo sem viés de positividade forçada
- **Histórico**: rail lateral com todas as análises anteriores.
- **Preview mode**: demonstração com dados de exemplo sem precisar de conta
- **Ações no resultado**: copiar, exportar `.md`, exportar `.pdf`, limpar
- **Validação de URL**: apenas URLs válidas do Instagram (`/p/`, `/reel/`, `/tv/`) disparam requisição

---

## Rodando localmente

```bash
# instalar dependências
npm install

# iniciar servidor de desenvolvimento
npm run dev

# build de produção
npm run build
```

Requer Node.js 20+.

---

## Casos de uso

- Criadores de conteúdo que querem saber o que o público realmente achou
- Marcas monitorando repercussão de campanhas
- Profissionais de social media reportando performance de posts
- Pesquisadores analisando recepção pública de temas específicos
