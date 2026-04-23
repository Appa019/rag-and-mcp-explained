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
      "O usuário descreve a intenção. Não precisa conhecer nomes de ferramentas, nomes de campos ou formatos de data. Essa é a camada de entrada que o resto do protocolo vai servir.",
  },
  {
    actor: "client",
    title: "Cliente identifica a necessidade de ferramenta",
    summary: "A resposta depende de dados que a LLM não tem.",
    detail:
      "A LLM analisa a pergunta e conclui que precisa de dados externos para respondê-la com precisão. A saída esperada desta etapa é a decisão de entrar no protocolo MCP em vez de responder diretamente a partir do conhecimento paramétrico do modelo.",
  },
  {
    actor: "client",
    title: "Cliente consulta a lista de ferramentas",
    summary: "tools/list",
    detail:
      "Chamada padrão do MCP. O cliente pede ao servidor o catálogo atual de ferramentas. A resposta traz, para cada ferramenta, nome, descrição em linguagem natural e JSON Schema dos argumentos aceitos.",
    payload: `{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}`,
  },
  {
    actor: "server",
    title: "Servidor responde com o catálogo",
    summary: "3 ferramentas devolvidas",
    detail:
      "A resposta descreve cada ferramenta disponível no momento. A descrição em linguagem natural é importante: ela é o sinal principal que a LLM usa para decidir qual ferramenta invocar.",
    payload: `{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      { "name": "query_invoices",  "description": "Consulta faturas por filtros de data e status.", ... },
      { "name": "send_email",      "description": "Envia e-mail transacional.", ... },
      { "name": "summarize_docs",  "description": "Resume documentos longos em bullets.", ... }
    ]
  }
}`,
  },
  {
    actor: "client",
    title: "Cliente escolhe a ferramenta apropriada",
    summary: "query_invoices corresponde à intenção da pergunta.",
    detail:
      "A LLM compara o texto da pergunta com as descrições recebidas. A escolha é feita pelo próprio modelo, não por uma regra externa. A qualidade da descrição da ferramenta impacta diretamente a acurácia dessa escolha.",
  },
  {
    actor: "client",
    title: "Cliente invoca a ferramenta",
    summary: "tools/call com os argumentos preenchidos",
    detail:
      "A LLM preenche os argumentos com base no JSON Schema da ferramenta e no conteúdo da pergunta. Hoje é 23 de abril de 2026, e due_date assume essa data.",
    payload: `{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "query_invoices",
    "arguments": { "due_date": "2026-04-23" }
  }
}`,
  },
  {
    actor: "server",
    title: "Servidor executa e retorna o resultado",
    summary: "12 faturas, total R$ 23.450,00",
    detail:
      "A implementação interna da ferramenta pode ser uma query SQL, uma chamada a outro serviço, a leitura de um arquivo. O cliente recebe apenas o payload estruturado de retorno, sem visibilidade sobre a execução.",
    payload: `{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "12 invoices due 2026-04-23, total R$ 23,450.00"
      }
    ]
  }
}`,
  },
  {
    actor: "client",
    title: "Cliente compõe a resposta final",
    summary: "Payload estruturado traduzido em frase natural.",
    detail:
      "A LLM formata o conteúdo de retorno em uma resposta coerente com a pergunta original. Pode encadear uma segunda chamada de ferramenta se o resultado da primeira não for suficiente.",
  },
  {
    actor: "user",
    title: "Usuário recebe a resposta",
    summary: "“Hoje vencem 12 faturas, totalizando R$ 23.450,00.”",
    detail:
      "Do lado do usuário, houve apenas uma troca de mensagem. O protocolo MCP, os schemas e a sequência JSON-RPC ficam encapsulados na camada do cliente.",
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
