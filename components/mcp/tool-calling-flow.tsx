"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Cpu, Server, ChevronDown } from "lucide-react";

type Actor = "user" | "client" | "server";

type Step = {
  actor: Actor;
  title: string;
  summary: string;
  detail: string;
  payload?: string;
};

const steps: Step[] = [
  {
    actor: "user",
    title: "Pergunta em linguagem natural",
    summary: "“Quantas faturas vencem hoje?”",
    detail:
      "O usuário não sabe — e não precisa saber — se existe uma ferramenta chamada query_invoices. Ele descreve a intenção.",
  },
  {
    actor: "client",
    title: "O cliente decide que vai precisar de ajuda",
    summary: "LLM reconhece que a resposta depende de dados atuais que ela não tem.",
    detail:
      "Em vez de responder direto e arriscar alucinar, a LLM identifica que precisa consultar algo externo. Aqui começa o protocolo.",
  },
  {
    actor: "client",
    title: "Cliente MCP pede a lista de ferramentas",
    summary: "list_tools()",
    detail:
      "Chamada padrão do MCP. O cliente não precisa saber quais ferramentas o servidor oferece — por isso pergunta. A resposta traz nome, descrição e JSON Schema de entrada de cada uma.",
    payload: `{\n  "method": "tools/list",\n  "params": {}\n}`,
  },
  {
    actor: "server",
    title: "Servidor responde com o catálogo",
    summary: "3 ferramentas devolvidas",
    detail:
      "Para cada ferramenta, o servidor envia nome, descrição em linguagem natural (essencial para a LLM escolher) e o schema de argumentos.",
    payload: `[\n  { "name": "query_invoices", "description": "Consulta faturas por filtros", ... },\n  { "name": "send_email", ... },\n  { "name": "summarize_docs", ... }\n]`,
  },
  {
    actor: "client",
    title: "LLM escolhe uma ferramenta",
    summary: "query_invoices é a mais alinhada à intenção",
    detail:
      "A escolha é feita pelo modelo, não por uma regra estática. A descrição em linguagem natural é o que torna isso possível — a LLM compara intenção com descrição.",
  },
  {
    actor: "client",
    title: "Cliente invoca a ferramenta",
    summary: "call_tool(\"query_invoices\", { due_date: \"2026-04-23\" })",
    detail:
      "A LLM também preenche os argumentos a partir do schema e da pergunta original. Hoje é 23 de abril de 2026, então due_date vira essa data.",
    payload: `{\n  "method": "tools/call",\n  "params": {\n    "name": "query_invoices",\n    "arguments": { "due_date": "2026-04-23" }\n  }\n}`,
  },
  {
    actor: "server",
    title: "Servidor executa e retorna",
    summary: "12 faturas encontradas, R$ 23.450,00",
    detail:
      "O servidor pode estar fazendo uma query SQL, chamando outra API, lendo um arquivo — isso é invisível ao cliente. O retorno é sempre um payload estruturado que a LLM consegue ler.",
    payload: `{\n  "content": [{\n    "type": "text",\n    "text": "12 invoices due 2026-04-23, total R$ 23,450.00"\n  }]\n}`,
  },
  {
    actor: "client",
    title: "LLM compõe a resposta final",
    summary: "Traduz o payload em frase natural",
    detail:
      "A LLM recebe o resultado estruturado e o transforma na frase que o usuário lerá. Pode também fazer uma segunda chamada a uma ferramenta diferente se a primeira não bastar.",
  },
  {
    actor: "user",
    title: "Usuário lê a resposta",
    summary: "“Hoje vencem 12 faturas, totalizando R$ 23.450,00.”",
    detail:
      "Todo o protocolo — discovery, schemas, JSON-RPC — ficou invisível. O usuário viu uma conversa; o sistema por baixo fez descoberta em runtime.",
  },
];

const actorMeta: Record<Actor, { icon: typeof User; label: string; color: string }> = {
  user: { icon: User, label: "Usuário", color: "var(--color-ink)" },
  client: { icon: Cpu, label: "Cliente MCP (LLM)", color: "var(--color-accent)" },
  server: { icon: Server, label: "Servidor MCP", color: "var(--color-success)" },
};

export const ToolCallingFlow = () => {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <ol className="relative flex flex-col">
      <span
        aria-hidden
        className="absolute left-[15px] top-4 bottom-4 w-px bg-rule"
      />
      {steps.map((step, i) => {
        const meta = actorMeta[step.actor];
        const Icon = meta.icon;
        const isOpen = open.has(i);
        return (
          <li key={i} className="relative grid grid-cols-[32px_1fr] gap-4 py-1.5">
            <span
              className="relative z-10 mt-3 flex size-8 items-center justify-center border bg-surface"
              style={{ borderColor: meta.color, color: meta.color }}
            >
              <Icon aria-hidden className="size-3.5" />
            </span>
            <div className="border border-rule bg-surface">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[1fr_auto] items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-bg"
              >
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </span>
                  </span>
                  <span className="font-serif text-xl leading-tight text-ink">
                    {step.title}
                  </span>
                  <span className="text-[14.5px] leading-snug text-ink-muted">
                    {step.summary}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={`mt-2 size-4 text-ink-muted transition-transform ${
                    isOpen ? "rotate-180 text-ink" : ""
                  }`}
                />
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
                    <div className="flex flex-col gap-4 border-t border-rule px-5 py-4">
                      <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink">
                        {step.detail}
                      </p>
                      {step.payload ? (
                        <pre className="overflow-x-auto border-l-2 border-rule bg-bg px-4 py-3 font-mono text-[12.5px] leading-relaxed text-ink">
                          <code>{step.payload}</code>
                        </pre>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
