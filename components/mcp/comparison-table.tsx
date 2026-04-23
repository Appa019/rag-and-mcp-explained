"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Row = {
  dimension: string;
  api: string;
  mcp: string;
  detail: string;
};

const rows: Row[] = [
  {
    dimension: "Descoberta de capacidades",
    api: "Build time, via SDK",
    mcp: "Runtime, via list_tools()",
    detail:
      "Em API tradicional, o conjunto de endpoints precisa ser conhecido antes do deploy do cliente. Em MCP, uma ferramenta nova aparece na próxima listagem — nenhum deploy de cliente é necessário.",
  },
  {
    dimension: "Contrato",
    api: "Schema fixo, versionado",
    mcp: "Auto-descrito, JSON Schema por tool",
    detail:
      "A API descreve seu contrato em OpenAPI ou equivalente e congela. O MCP devolve o JSON Schema de cada ferramenta junto com a listagem, e a descrição é em linguagem natural — legível por modelos.",
  },
  {
    dimension: "Transporte",
    api: "HTTP / gRPC",
    mcp: "stdio, SSE, Streamable HTTP",
    detail:
      "API tradicional vive quase sempre sobre HTTP. MCP define três transportes: stdio para processos locais, SSE para streaming remoto e Streamable HTTP. O conteúdo trafegado é JSON-RPC.",
  },
  {
    dimension: "Cliente",
    api: "Escrito à mão por integração",
    mcp: "Cliente universal (LLM, IDE, agente)",
    detail:
      "Cada novo serviço REST costuma exigir um cliente novo. Um cliente MCP — por exemplo, uma LLM ou uma IDE — fala com qualquer servidor MCP sem código específico.",
  },
  {
    dimension: "Estado",
    api: "Sem estado por requisição",
    mcp: "Sessão persistente por conexão",
    detail:
      "REST assume statelessness. MCP mantém uma conexão de longa duração, o que permite recursos como prompts contextuais, streaming de progresso e cancelamento de tools em execução.",
  },
  {
    dimension: "Autenticação",
    api: "Headers, tokens, OAuth",
    mcp: "Delegada ao transporte + capability",
    detail:
      "Em API, autenticação é responsabilidade do cliente a cada chamada. Em MCP, a sessão é autenticada uma vez no transporte; o servidor pode também anunciar que certas ferramentas exigem permissões específicas.",
  },
  {
    dimension: "Evolução",
    api: "Versionamento, breaking changes",
    mcp: "Adição não quebra clientes existentes",
    detail:
      "Adicionar um endpoint novo em REST costuma exigir um v2. Adicionar uma tool em MCP é não-breaking: o cliente antigo continua funcionando, só não usa a tool nova.",
  },
  {
    dimension: "Público-alvo",
    api: "Desenvolvedores",
    mcp: "Modelos de IA",
    detail:
      "REST é interface de produto: humanos escrevem código contra ela. MCP é interface de contexto: a descrição precisa ser legível e escolhível por um modelo em tempo de execução.",
  },
];

export const ComparisonTable = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border border-rule bg-surface">
      <header className="hidden grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b border-rule px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted md:grid">
        <span>Dimensão</span>
        <span>API tradicional</span>
        <span>MCP</span>
        <span className="w-5" />
      </header>
      <ul className="divide-y divide-rule">
        {rows.map((row, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={row.dimension}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 px-5 py-4 text-left transition-colors hover:bg-bg md:grid-cols-[1fr_1fr_1fr_auto]"
                aria-expanded={isOpen}
              >
                <span className="col-span-1 font-serif text-[15px] leading-snug text-ink md:col-span-1">
                  {row.dimension}
                </span>
                <ChevronDown
                  aria-hidden
                  className={`mt-1 size-4 text-ink-muted transition-transform md:order-last ${
                    isOpen ? "rotate-180 text-ink" : ""
                  }`}
                />
                <span className="col-span-2 flex flex-col gap-1 md:col-span-1 md:block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle md:hidden">
                    API
                  </span>
                  <span className="text-[14px] leading-snug text-ink-muted">
                    {row.api}
                  </span>
                </span>
                <span className="col-span-2 flex flex-col gap-1 md:col-span-1 md:block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle md:hidden">
                    MCP
                  </span>
                  <span className="text-[14px] leading-snug text-ink">
                    {row.mcp}
                  </span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-rule bg-bg px-5 py-5">
                      <p className="max-w-[60ch] font-serif text-[15.5px] leading-[1.7] text-ink">
                        {row.detail}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
