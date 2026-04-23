"use client";

import { motion, useReducedMotion } from "framer-motion";

const NODE_WIDTH = 140;
const NODE_HEIGHT = 60;

export const TraditionalApiDiagram = () => {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 2.6;

  return (
    <figure className="border border-rule bg-surface p-6 md:p-10">
      <figcaption className="mb-6 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          API tradicional · fluxo
        </span>
        <span className="font-mono text-[10.5px] text-ink-muted">
          Contrato fixo, integração manual
        </span>
      </figcaption>

      <svg
        viewBox="0 0 720 260"
        className="h-auto w-full"
        role="img"
        aria-label="Cliente envia requisição HTTP para um endpoint, que consulta o banco e responde"
      >
        <Node x={30} y={100} label="Cliente" sub="hardcoded" />
        <Node x={290} y={100} label="/api/orders" sub="endpoint fixo" />
        <Node x={550} y={100} label="Banco" sub="SQL / NoSQL" />

        <motion.line
          x1={170}
          y1={118}
          x2={290}
          y2={118}
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: duration * 0.35,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration,
            repeatType: "reverse",
          }}
        />
        <motion.line
          x1={430}
          y1={118}
          x2={550}
          y2={118}
          stroke="var(--color-ink-muted)"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: duration * 0.3,
            delay: duration * 0.4,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration,
            repeatType: "reverse",
          }}
        />

        <motion.g
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 120] }}
          transition={{
            duration: duration * 0.4,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration * 0.9,
            times: [0, 0.2, 0.8, 1],
          }}
        >
          <rect
            x={170}
            y={73}
            width={120}
            height={22}
            fill="var(--color-accent)"
            rx="0"
          />
          <text
            x={230}
            y={88}
            fill="white"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
            letterSpacing="0.05em"
          >
            POST /orders
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, 0, -120] }}
          transition={{
            duration: duration * 0.5,
            delay: duration * 0.55,
            repeat: prefersReduced ? 0 : Infinity,
            repeatDelay: duration * 0.85,
            times: [0, 0.2, 0.4, 0.8, 1],
          }}
        >
          <rect
            x={170}
            y={145}
            width={120}
            height={22}
            fill="var(--color-success)"
            rx="0"
          />
          <text
            x={230}
            y={160}
            fill="white"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
            letterSpacing="0.05em"
          >
            200 OK · { "{…}" }
          </text>
        </motion.g>

        <text
          x={360}
          y={225}
          fontFamily="var(--font-serif)"
          fontSize="12"
          fontStyle="italic"
          fill="var(--color-ink-muted)"
          textAnchor="middle"
        >
          toda chamada depende de já saber qual endpoint usar
        </text>
      </svg>
    </figure>
  );
};

type NodeProps = { x: number; y: number; label: string; sub: string };

const Node = ({ x, y, label, sub }: NodeProps) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        fill="var(--color-bg)"
        stroke="var(--color-ink)"
        strokeWidth="1"
      />
      <text
        x={x + NODE_WIDTH / 2}
        y={y + 25}
        fontFamily="var(--font-serif)"
        fontSize="17"
        fill="var(--color-ink)"
        textAnchor="middle"
      >
        {label}
      </text>
      <text
        x={x + NODE_WIDTH / 2}
        y={y + 45}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        letterSpacing="0.08em"
      >
        {sub}
      </text>
    </g>
  );
};
