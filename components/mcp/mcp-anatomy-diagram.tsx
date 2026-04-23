"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Wrench, Database, FileText } from "lucide-react";

export const McpAnatomyDiagram = () => {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 3.6;

  return (
    <figure className="border border-rule bg-surface p-6 md:p-10">
      <figcaption className="mb-6 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          MCP · fluxo de listagem e invocação
        </span>
        <span className="font-mono text-[10.5px] text-ink-muted">
          Descoberta em runtime
        </span>
      </figcaption>

      <svg
        viewBox="0 0 760 320"
        className="h-auto w-full"
        role="img"
        aria-label="Cliente MCP descobre ferramentas do servidor em runtime e depois invoca uma delas"
      >
        <g>
          <rect
            x={40}
            y={120}
            width={150}
            height={80}
            fill="var(--color-bg)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <text
            x={115}
            y={150}
            fontFamily="var(--font-serif)"
            fontSize="18"
            fill="var(--color-ink)"
            textAnchor="middle"
          >
            Cliente MCP
          </text>
          <text
            x={115}
            y={172}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--color-ink-muted)"
            textAnchor="middle"
            letterSpacing="0.08em"
          >
            ex: uma LLM
          </text>
          <text
            x={115}
            y={188}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--color-ink-subtle)"
            textAnchor="middle"
          >
            agente, IDE…
          </text>
        </g>

        <g>
          <rect
            x={440}
            y={40}
            width={280}
            height={240}
            fill="var(--color-bg)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <text
            x={580}
            y={68}
            fontFamily="var(--font-serif)"
            fontSize="18"
            fill="var(--color-ink)"
            textAnchor="middle"
          >
            Servidor MCP
          </text>
          <text
            x={580}
            y={88}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--color-ink-muted)"
            textAnchor="middle"
            letterSpacing="0.08em"
          >
            processo, container, binário
          </text>

          <InnerPanel x={460} y={108} icon="tools" label="Tools" sub="ações que alteram estado" />
          <InnerPanel x={460} y={164} icon="resources" label="Resources" sub="dados somente-leitura" />
          <InnerPanel x={460} y={220} icon="prompts" label="Prompts" sub="receitas reutilizáveis" />
        </g>

        <line
          x1={190}
          y1={160}
          x2={440}
          y2={160}
          stroke="var(--color-ink-muted)"
          strokeWidth="0.8"
          strokeDasharray="2 4"
          opacity="0.45"
        />
        <text
          x={315}
          y={140}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          letterSpacing="0.08em"
        >
          stdio · SSE · HTTP
        </text>

        <motion.g
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 230] }}
          transition={{
            duration: duration * 0.22,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration * 1.1,
            times: [0, 0.2, 0.8, 1],
          }}
        >
          <rect
            x={205}
            y={113}
            width={90}
            height={20}
            fill="var(--color-accent)"
          />
          <text
            x={250}
            y={127}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="white"
            textAnchor="middle"
          >
            list_tools()
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, 0, -230] }}
          transition={{
            duration: duration * 0.28,
            delay: duration * 0.22,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration * 1.05,
            times: [0, 0.1, 0.3, 0.8, 1],
          }}
        >
          <rect
            x={205}
            y={176}
            width={230}
            height={20}
            fill="var(--color-success)"
          />
          <text
            x={320}
            y={190}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="white"
            textAnchor="middle"
          >
            [search, summarize, convert, …]
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, 0, 230] }}
          transition={{
            duration: duration * 0.3,
            delay: duration * 0.6,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration * 1.0,
            times: [0, 0.1, 0.3, 0.8, 1],
          }}
        >
          <rect
            x={205}
            y={236}
            width={150}
            height={20}
            fill="var(--color-highlight)"
          />
          <text
            x={280}
            y={250}
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="white"
            textAnchor="middle"
          >
            call_tool(&quot;search&quot;, …)
          </text>
        </motion.g>

        <text
          x={380}
          y={306}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          letterSpacing="0.04em"
        >
          nome, descrição e schema de cada tool chegam pela listagem
        </text>
      </svg>
    </figure>
  );
};

type InnerPanelProps = {
  x: number;
  y: number;
  icon: "tools" | "resources" | "prompts";
  label: string;
  sub: string;
};

const InnerPanel = ({ x, y, icon, label, sub }: InnerPanelProps) => {
  const Icon =
    icon === "tools" ? Wrench : icon === "resources" ? Database : FileText;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={240}
        height={44}
        fill="var(--color-surface)"
        stroke="var(--color-rule)"
        strokeWidth="1"
      />
      <foreignObject x={x + 12} y={y + 12} width={20} height={20}>
        <Icon
          aria-hidden
          style={{ color: "var(--color-ink)" }}
          width={18}
          height={18}
        />
      </foreignObject>
      <text
        x={x + 40}
        y={y + 22}
        fontFamily="var(--font-serif)"
        fontSize="14"
        fill="var(--color-ink)"
      >
        {label}
      </text>
      <text
        x={x + 40}
        y={y + 36}
        fontFamily="var(--font-mono)"
        fontSize="9.5"
        fill="var(--color-ink-muted)"
        letterSpacing="0.06em"
      >
        {sub}
      </text>
    </g>
  );
};
