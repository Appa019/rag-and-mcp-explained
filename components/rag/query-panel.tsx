"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { corpus, getChunkById, prompts } from "@/lib/corpus";
import {
  dimensions,
  getCategoryHex,
  getCategoryLabel,
} from "@/lib/dimensions";
import { topK } from "@/lib/retrieval";
import { VectorSpaceCanvas } from "@/components/three/vector-space-canvas";
import type { DimensionKey, Vec3 } from "@/lib/types";

export const QueryPanel = () => {
  const [selectedId, setSelectedId] = useState(prompts[0]?.id ?? "p1");

  const selected = useMemo(
    () => prompts.find((p) => p.id === selectedId) ?? prompts[0],
    [selectedId],
  );

  const topResults = useMemo(() => {
    if (!selected) return [];
    return topK(selected.queryVector8d, corpus, 3);
  }, [selected]);

  const highlightIds = topResults.map((r) => r.chunkId);

  const lines = useMemo(() => {
    if (!selected) return [];
    return topResults
      .map((r) => {
        const chunk = getChunkById(r.chunkId);
        if (!chunk) return null;
        return { from: selected.queryCoords3d, to: chunk.coords3d as Vec3, rank: r.rank };
      })
      .filter(<T,>(x: T | null): x is T => x !== null);
  }, [selected, topResults]);

  const activated = new Set(selected?.activatedDimensions ?? []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          Escolha uma pergunta
        </p>
        <ul className="flex flex-wrap gap-2">
          {prompts.map((p) => {
            const isActive = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  aria-pressed={isActive}
                  className={`border px-3 py-2 text-left text-[14px] transition-colors ${
                    isActive
                      ? "border-ink bg-ink text-surface"
                      : "border-rule bg-surface text-ink hover:border-ink"
                  }`}
                >
                  {p.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <VectorSpaceCanvas
        chunks={corpus}
        highlightIds={highlightIds}
        query={
          selected
            ? { coords3d: selected.queryCoords3d, label: selected.label.slice(0, 40) }
            : undefined
        }
        topKLines={lines}
        height="540px"
        caption="O octaedro preto representa o vetor da consulta. As linhas tracejadas ligam a consulta aos três chunks com maior similaridade cosseno."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <section className="md:col-span-3 border border-rule bg-surface">
          <header className="flex items-center justify-between border-b border-rule px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Top-3 recuperado
            </span>
            <span className="font-mono text-[11px] text-ink-muted">
              similaridade cosseno
            </span>
          </header>
          <ol className="divide-y divide-rule">
            <AnimatePresence mode="popLayout">
              {topResults.map((r) => {
                const chunk = getChunkById(r.chunkId);
                if (!chunk) return null;
                return (
                  <motion.li
                    key={`${selected?.id}-${r.chunkId}`}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25, delay: r.rank * 0.06 }}
                    className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-5 py-4"
                  >
                    <span
                      className="font-serif text-3xl leading-none"
                      style={{ color: getCategoryHex(chunk.category) }}
                    >
                      {r.rank}
                    </span>
                    <span className="flex flex-col gap-1 min-w-0">
                      <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em]">
                        <span style={{ color: getCategoryHex(chunk.category) }}>
                          {getCategoryLabel(chunk.category)}
                        </span>
                        <span className="text-ink-subtle">· {chunk.id}</span>
                      </span>
                      <span className="text-[14px] leading-snug text-ink">
                        {chunk.text.slice(0, 170)}
                        {chunk.text.length > 170 ? "…" : ""}
                      </span>
                    </span>
                    <span className="font-mono text-[13px] tabular-nums text-ink">
                      {r.similarity.toFixed(3)}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </section>

        <section className="md:col-span-2 flex flex-col gap-4 border border-rule bg-surface p-5">
          <header>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Dimensões que acendem
            </span>
          </header>
          <ul className="flex flex-col gap-2">
            {dimensions.map((d) => {
              const value = selected?.queryVector8d[dimensionIndex(d.key)] ?? 0;
              const on = activated.has(d.key);
              return (
                <li key={d.key} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider ${
                      on ? "text-ink" : "text-ink-subtle"
                    }`}
                  >
                    {d.label}
                  </span>
                  <span className="h-[3px] bg-rule">
                    <motion.span
                      className="block h-full"
                      style={{
                        backgroundColor: on
                          ? "var(--color-highlight)"
                          : "var(--color-rule-strong)",
                      }}
                      animate={{ width: `${Math.round(value * 100)}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                    {value.toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>
          {selected ? (
            <p className="mt-2 border-t border-rule pt-4 font-serif text-[15px] italic leading-relaxed text-ink-muted">
              {selected.explanation}
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
};

const dimensionIndex = (key: DimensionKey): number => {
  switch (key) {
    case "temporal":
      return 0;
    case "geografico":
      return 1;
    case "cientifico":
      return 2;
    case "cultural":
      return 3;
    case "tecnologico":
      return 4;
    case "historico":
      return 5;
    case "numerico":
      return 6;
    case "afetivo":
      return 7;
  }
};

