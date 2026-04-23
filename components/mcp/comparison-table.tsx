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
    api: "Em build time, via SDK",
    mcp: "Em runtime, via tools/list",
    detail:
      "Em uma API REST, o conjunto de endpoints precisa ser conhecido antes do deploy do cliente. A adição de um endpoint exige atualização do cliente. Em MCP, uma ferramenta nova aparece na próxima resposta a tools/list, sem necessidade de mudança no código cliente.",
  },
  {
    dimension: "Contrato",
    api: "Schema fixo, versionado (OpenAPI)",
    mcp: "JSON Schema por tool + descrição em linguagem natural",
    detail:
      "A API descreve seu contrato em OpenAPI, Protobuf ou equivalente, fixo até o próximo deploy. O MCP devolve o JSON Schema de cada ferramenta junto com a listagem. A descrição textual da ferramenta é o sinal que a LLM usa para decidir qual invocar.",
  },
  {
    dimension: "Transporte",
    api: "HTTP ou gRPC",
    mcp: "stdio, Streamable HTTP ou SSE",
    detail:
      "API REST quase sempre usa HTTP. MCP define três transportes. stdio é usado para servidores locais rodando como processo filho do cliente. Streamable HTTP e SSE são usados para servidores remotos. O conteúdo trafegado é JSON-RPC 2.0 em todos os casos.",
  },
  {
    dimension: "Cliente",
    api: "Escrito à mão por integração",
    mcp: "Cliente universal (LLM, IDE, agente)",
    detail:
      "Cada novo serviço REST costuma exigir um cliente próprio, com código específico para os endpoints daquele serviço. Um cliente MCP fala com qualquer servidor MCP que respeite a especificação, sem código específico por servidor.",
  },
  {
    dimension: "Estado",
    api: "Sem estado por requisição",
    mcp: "Sessão persistente por conexão",
    detail:
      "REST assume statelessness. MCP mantém uma conexão de longa duração. Isso permite streaming de progresso de tools em execução, cancelamento cooperativo e assinatura de notificações.",
  },
  {
    dimension: "Autenticação",
    api: "Headers, tokens, OAuth",
    mcp: "Delegada ao transporte e a capabilities",
    detail:
      "Em API REST, a autenticação é responsabilidade do cliente a cada chamada. Em MCP, a sessão é autenticada uma vez no transporte. O servidor pode também declarar que certas ferramentas exigem permissões adicionais, que o cliente precisa confirmar antes de invocá-las.",
  },
  {
    dimension: "Evolução",
    api: "Versionamento, breaking changes",
    mcp: "Adição de tool é compatível",
    detail:
      "Adicionar um endpoint novo em REST costuma exigir versionamento para evitar quebras. Adicionar uma tool em MCP é compatível: o cliente antigo continua funcionando e apenas ignora a tool nova, que só passa a ser usada por clientes que a consideram relevante.",
  },
  {
    dimension: "Público-alvo",
    api: "Desenvolvedores humanos",
    mcp: "Modelos de linguagem",
    detail:
      "REST é uma interface de produto pensada para pessoas escreverem código contra ela. MCP é uma interface de contexto pensada para modelos escolherem ferramentas em tempo de execução. A diferença de público explica a maior parte das demais divergências.",
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
