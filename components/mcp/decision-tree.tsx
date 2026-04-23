"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";

type Leaf = {
  kind: "leaf";
  id: string;
  headline: string;
  body: string;
  accent: string;
};

type Node = {
  kind: "node";
  id: string;
  question: string;
  yes: Leaf | Node;
  no: Leaf | Node;
  yesLabel?: string;
  noLabel?: string;
};

const tree: Node = {
  kind: "node",
  id: "root",
  question: "O cliente principal da integração é um modelo de IA ou agente?",
  yes: {
    kind: "node",
    id: "freq",
    question: "O conjunto de ferramentas muda com frequência (novas tools, descoberta dinâmica)?",
    yes: {
      kind: "leaf",
      id: "mcp-pure",
      headline: "MCP, direto.",
      body:
        "Descoberta em runtime e adição não-breaking de ferramentas são o caso de uso canônico do MCP. Não há ganho em espelhar isso atrás de uma API REST.",
      accent: "var(--color-accent)",
    },
    no: {
      kind: "node",
      id: "api-exists",
      question: "Você já tem uma API REST que faz o que o agente precisa?",
      yes: {
        kind: "leaf",
        id: "mcp-wrap",
        headline: "Servidor MCP como verniz.",
        body:
          "Escreva um servidor MCP pequeno que traduz as chamadas do modelo para as chamadas REST já existentes. Você ganha descoberta em runtime sem jogar fora a API.",
        accent: "var(--color-success)",
      },
      no: {
        kind: "leaf",
        id: "mcp-new",
        headline: "MCP de saída.",
        body:
          "Como não há legado e o cliente é um modelo, comece já com MCP. Se depois precisar expor a mesma funcionalidade para humanos ou scripts, some uma API REST por cima.",
        accent: "var(--color-accent)",
      },
    },
  },
  no: {
    kind: "node",
    id: "both",
    question: "Vai haver agentes consumindo também, não só humanos e apps?",
    yes: {
      kind: "leaf",
      id: "both-stack",
      headline: "API REST + servidor MCP.",
      body:
        "Sirva humanos e apps controlados via REST; sirva agentes via um servidor MCP. Os dois podem compartilhar a mesma lógica interna — apenas as camadas de interface mudam.",
      accent: "var(--color-success)",
    },
    no: {
      kind: "leaf",
      id: "api-rest",
      headline: "API REST tradicional.",
      body:
        "Clientes humanos e apps escritos à mão se beneficiam de um contrato fixo e documentado. MCP não tem o que adicionar aqui.",
      accent: "var(--color-ink-muted)",
    },
  },
};

type HistoryStep = { nodeId: string; answer: "yes" | "no" };

export const DecisionTree = () => {
  const [history, setHistory] = useState<HistoryStep[]>([]);

  const current = useMemo(() => {
    let node: Node | Leaf = tree;
    for (const step of history) {
      if (node.kind !== "node") break;
      node = step.answer === "yes" ? node.yes : node.no;
    }
    return node;
  }, [history]);

  const answer = (choice: "yes" | "no") => {
    if (current.kind !== "node") return;
    setHistory((prev) => [...prev, { nodeId: current.id, answer: choice }]);
  };

  const back = () => setHistory((prev) => prev.slice(0, -1));
  const reset = () => setHistory([]);

  const step = history.length + 1;

  return (
    <div className="border border-rule bg-surface">
      <header className="flex items-center justify-between border-b border-rule px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          Árvore de decisão · passo {step}
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={back}
            disabled={history.length === 0}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
          >
            <ArrowLeft aria-hidden className="size-3" />
            Voltar
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={history.length === 0}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
          >
            <RefreshCw aria-hidden className="size-3" />
            Recomeçar
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {current.kind === "node" ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-6 px-6 py-8 md:px-10"
          >
            <p className="max-w-2xl font-serif text-2xl leading-tight text-ink md:text-3xl">
              {current.question}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => answer("yes")}
                className="border border-ink bg-ink px-4 py-2 text-[13px] text-surface transition-opacity hover:opacity-85"
              >
                {current.yesLabel ?? "Sim"}
              </button>
              <button
                type="button"
                onClick={() => answer("no")}
                className="border border-ink bg-surface px-4 py-2 text-[13px] text-ink transition-colors hover:bg-bg"
              >
                {current.noLabel ?? "Não"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-5 border-l-2 px-6 py-8 md:px-10"
            style={{ borderColor: current.accent }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: current.accent }}
            >
              Recomendação
            </span>
            <p className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              {current.headline}
            </p>
            <p className="max-w-2xl text-[16px] leading-relaxed text-ink-muted">
              {current.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {history.length > 0 ? (
        <footer className="border-t border-rule px-5 py-3">
          <ol className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {history.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <span>
                  {i + 1}. {h.answer === "yes" ? "Sim" : "Não"}
                </span>
                {i < history.length - 1 ? (
                  <span className="text-ink-subtle">·</span>
                ) : null}
              </li>
            ))}
          </ol>
        </footer>
      ) : null}
    </div>
  );
};
