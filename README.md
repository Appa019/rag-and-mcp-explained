# RAG × MCP

Material educacional interativo que mostra o que acontece dentro de um pipeline de RAG (Retrieval-Augmented Generation) e como o MCP (Model Context Protocol) se diferencia de uma API REST.

Site: https://educacionalragmcp.vercel.app

O conteúdo está em português. Tudo roda no navegador: não há banco vetorial, servidor de modelo nem chamada a API externa.

## Módulo 1: RAG

| Seção | O que mostra |
|---|---|
| Chunking | Fórmulas da posição inicial de cada chunk e do número de chunks. Simulador com sliders de tamanho e sobreposição sobre um texto de exemplo. |
| Embeddings | Similaridade cosseno, produto escalar e norma L2 (KaTeX). Espaço vetorial 3D com os 24 chunks do corpus, que dá para girar e ampliar, com o trecho exibido ao passar o ponteiro. Explica a redução de dimensionalidade (PCA, t-SNE, UMAP). |
| Indexação e metadados | Grade com os 24 chunks, filtro por categoria e ordenação por data ou por tokens. Pré e pós-filtragem, ANN e bancos vetoriais. |
| Dados dinâmicos | Simulação de inserções, atualizações e remoções no índice, com contagem por categoria e botão de pausa. Políticas de retenção e consistência durante a atualização. |
| Playground | Oito perguntas prontas. Para cada uma, calcula a similaridade cosseno contra o corpus e destaca os 3 chunks mais próximos no espaço 3D, ao lado do valor da consulta em cada dimensão. |

Os vetores são curados à mão, com oito dimensões nomeadas (temporal, geográfico, científico, cultural, tecnológico, histórico, numérico, afetivo), para que dê para ver por que cada chunk foi recuperado. A página Sobre explica em que isso difere de embeddings reais de 768 a 3072 dimensões opacas.

## Módulo 2: MCP

| Seção | O que mostra |
|---|---|
| Anatomia de uma API REST | Diagrama do fluxo de requisição, contrato fixo em build time e um cliente TypeScript de exemplo. |
| Anatomia do MCP | Diagrama de cliente, servidor e transporte (stdio, Streamable HTTP, SSE). Tools, resources e prompts, com exemplo de resposta a `tools/list`. |
| Comparação | Tabela expansível com oito dimensões em que API REST e MCP divergem. |
| Fluxo de tool calling | Nove passos entre usuário, cliente e servidor, cada um com o payload JSON-RPC 2.0 correspondente. |
| Critérios de escolha | Árvore de decisão interativa: MCP, API REST ou os dois. |

## Stack

- Next.js 16.2.4 (App Router, páginas estáticas), React 19.2.4, TypeScript 5.9
- Tailwind CSS 4.2
- three 0.184, @react-three/fiber 9.6 e @react-three/drei 10.7 para o espaço vetorial 3D, com fallback 2D quando o navegador pede `prefers-reduced-motion`
- framer-motion 12, KaTeX 0.16, lucide-react
- Deploy na Vercel

## Rodando localmente

Requer Node.js e pnpm 10. No pnpm 11 ou mais novo, `pnpm install` termina com erro por causa da configuração de builds ignorados em `pnpm-workspace.yaml`.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de produção
pnpm start    # serve o build
pnpm lint
```

`NEXT_PUBLIC_SITE_URL` (ver `.env.example`) só é usada para gerar `sitemap.xml` e `robots.txt`. O site funciona sem ela.

## Estrutura

```
app/
  page.tsx          página inicial
  rag/              módulo RAG (chunking, embeddings, indexing, dynamic, playground)
  mcp/              módulo MCP (api-tradicional, anatomia, comparacao, tool-calling, decisao)
  sobre/            método e limites do modelo simulado
components/
  rag/              simulador de chunking, cards de metadados, indexador dinâmico, painel de consulta
  mcp/              diagramas, tabela de comparação, fluxo de tool calling, árvore de decisão
  three/            cena 3D do espaço vetorial e fallback 2D
  shell/, ui/       cabeçalho, rodapé, navegação, fórmulas, blocos de código
lib/                similaridade cosseno, top-k, corpus e dimensões
public/data/        corpus.json, dimensions.json, prompts.json
```

## Licença

MIT
