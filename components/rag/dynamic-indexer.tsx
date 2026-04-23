"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus, RefreshCw, Pause, Play } from "lucide-react";
import {
  categories,
  getCategoryColor,
  getCategoryLabel,
} from "@/lib/dimensions";
import type { CategoryKey } from "@/lib/types";

type EventKind = "add" | "update" | "remove";

type IndexEvent = {
  id: number;
  kind: EventKind;
  category: CategoryKey;
  docTitle: string;
  timestamp: number;
};

const seedDocs: { category: CategoryKey; title: string }[] = [
  { category: "ciencia", title: "Observação de onda gravitacional LIGO" },
  { category: "ciencia", title: "Microbioma intestinal e ansiedade" },
  { category: "historia", title: "Cartas do Barão do Rio Branco" },
  { category: "historia", title: "Decretos da Regência Trina" },
  { category: "geografia", title: "Deslocamento do Rio São Francisco" },
  { category: "geografia", title: "Relatório sobre a Mata Atlântica 2025" },
  { category: "cultura", title: "Ensaio sobre tropicalismo" },
  { category: "cultura", title: "Nota de imprensa — Festival de Parintins" },
  { category: "tecnologia", title: "RFC-9293 · TCP atualizado" },
  { category: "tecnologia", title: "Whitepaper sobre MoE esparsos" },
  { category: "economia", title: "Relatório Focus, semana 14" },
  { category: "economia", title: "Balanço do BNDES, 1º trimestre" },
  { category: "ciencia", title: "Nota técnica sobre CRISPR-Cas9" },
  { category: "historia", title: "Atas do Colégio Eleitoral 1985" },
  { category: "geografia", title: "Censo demográfico preliminar" },
  { category: "cultura", title: "Crítica sobre cinema retomada" },
  { category: "tecnologia", title: "Guia de deploy Kubernetes 1.32" },
  { category: "economia", title: "Plano plurianual 2024-2027" },
];

const kinds: EventKind[] = ["add", "add", "add", "update", "remove"];

const pick = <T,>(arr: readonly T[]): T => {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i] as T;
};

const kindMeta: Record<EventKind, { icon: typeof Plus; label: string; color: string }> = {
  add: { icon: Plus, label: "Adicionado", color: "var(--color-success)" },
  update: { icon: RefreshCw, label: "Reindexado", color: "var(--color-accent)" },
  remove: { icon: Minus, label: "Expirou", color: "var(--color-highlight)" },
};

export const DynamicIndexer = () => {
  const prefersReduced = useReducedMotion();
  const [events, setEvents] = useState<IndexEvent[]>([]);
  const [totalsByCategory, setTotalsByCategory] = useState<Record<CategoryKey, number>>(
    () => ({
      ciencia: 4,
      historia: 4,
      geografia: 4,
      cultura: 4,
      tecnologia: 4,
      economia: 4,
    }),
  );
  const [paused, setPaused] = useState(false);
  const counter = useRef(0);

  useEffect(() => {
    if (paused || prefersReduced) return;
    const interval = setInterval(() => {
      const doc = pick(seedDocs);
      const kind = pick(kinds);
      const event: IndexEvent = {
        id: counter.current++,
        kind,
        category: doc.category,
        docTitle: doc.title,
        timestamp: Date.now(),
      };
      setEvents((prev) => [event, ...prev].slice(0, 12));
      setTotalsByCategory((prev) => {
        const delta = kind === "remove" ? -1 : kind === "add" ? 1 : 0;
        const next = { ...prev, [doc.category]: Math.max(0, prev[doc.category] + delta) };
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [paused, prefersReduced]);

  const total = Object.values(totalsByCategory).reduce((s, v) => s + v, 0);
  const maxPerCategory = Math.max(...Object.values(totalsByCategory), 1);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
      <section className="md:col-span-2 border border-rule bg-surface">
        <header className="flex items-center justify-between border-b border-rule px-5 py-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Estado do índice
          </span>
          <span className="font-mono text-[11px] text-ink">
            {total.toString().padStart(3, "0")} chunks
          </span>
        </header>
        <ul className="divide-y divide-rule">
          {categories.map((c) => {
            const n = totalsByCategory[c.key];
            const pct = (n / maxPerCategory) * 100;
            return (
              <li key={c.key} className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block size-2"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-[13px] text-ink">{c.label}</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums text-ink">
                  {n.toString().padStart(2, "0")}
                </span>
                <span className="col-span-2 h-[2px] bg-rule">
                  <motion.span
                    className="block h-full"
                    style={{ backgroundColor: c.color }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </span>
              </li>
            );
          })}
        </ul>
        <footer className="flex items-center justify-between border-t border-rule px-5 py-3">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink"
            aria-pressed={paused}
          >
            {paused ? (
              <Play aria-hidden className="size-3" />
            ) : (
              <Pause aria-hidden className="size-3" />
            )}
            {paused ? "Retomar" : "Pausar"}
          </button>
          {prefersReduced ? (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-warn">
              Animação reduzida
            </span>
          ) : null}
        </footer>
      </section>

      <section className="md:col-span-3 border border-rule bg-surface">
        <header className="flex items-center justify-between border-b border-rule px-5 py-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Eventos recentes
          </span>
          <span className="font-mono text-[11px] text-ink-muted">
            {events.length} / 12
          </span>
        </header>
        <ul className="divide-y divide-rule">
          <AnimatePresence initial={false}>
            {events.length === 0 ? (
              <motion.li
                key="empty"
                className="px-5 py-8 text-center font-serif text-[15px] italic text-ink-muted"
              >
                Aguardando primeiro evento…
              </motion.li>
            ) : (
              events.map((e) => {
                const meta = kindMeta[e.kind];
                const Icon = meta.icon;
                return (
                  <motion.li
                    key={e.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[auto_auto_1fr] items-center gap-3 px-5 py-3"
                  >
                    <span
                      className="inline-flex size-6 items-center justify-center"
                      style={{ color: meta.color }}
                    >
                      <Icon aria-hidden className="size-3.5" />
                    </span>
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                      style={{ color: getCategoryColor(e.category) }}
                    >
                      {getCategoryLabel(e.category)}
                    </span>
                    <span className="truncate text-[14px] text-ink">
                      <span className="text-ink-muted">{meta.label}: </span>
                      {e.docTitle}
                    </span>
                  </motion.li>
                );
              })
            )}
          </AnimatePresence>
        </ul>
      </section>
    </div>
  );
};
