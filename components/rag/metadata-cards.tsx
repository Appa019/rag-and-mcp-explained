"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, Hash } from "lucide-react";
import { corpus } from "@/lib/corpus";
import {
  categories,
  getCategoryColor,
  getCategoryLabel,
} from "@/lib/dimensions";
import type { CategoryKey } from "@/lib/types";

type SortKey = "date-desc" | "date-asc" | "tokens-desc" | "tokens-asc";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "date-desc", label: "Mais recente" },
  { key: "date-asc", label: "Mais antigo" },
  { key: "tokens-desc", label: "Mais tokens" },
  { key: "tokens-asc", label: "Menos tokens" },
];

export const MetadataCards = () => {
  const [active, setActive] = useState<Set<CategoryKey>>(
    () => new Set(categories.map((c) => c.key)),
  );
  const [sort, setSort] = useState<SortKey>("date-desc");

  const toggle = (key: CategoryKey) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const all = () => setActive(new Set(categories.map((c) => c.key)));
  const none = () => setActive(new Set());

  const visible = useMemo(() => {
    const filtered = corpus.filter((c) => active.has(c.category));
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "date-desc":
          return b.date.localeCompare(a.date);
        case "date-asc":
          return a.date.localeCompare(b.date);
        case "tokens-desc":
          return b.tokens - a.tokens;
        case "tokens-asc":
          return a.tokens - b.tokens;
      }
    });
    return sorted;
  }, [active, sort]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 border-y border-rule py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-ink-muted">
            Categorias
          </span>
          {categories.map((c) => {
            const isOn = active.has(c.key);
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggle(c.key)}
                className="inline-flex items-center gap-1.5 border px-2.5 py-1 text-sm transition-colors"
                style={{
                  borderColor: isOn ? c.color : "var(--color-rule)",
                  color: isOn ? c.color : "var(--color-ink-muted)",
                  backgroundColor: "transparent",
                }}
                aria-pressed={isOn}
              >
                {isOn ? (
                  <Check aria-hidden className="size-3" />
                ) : (
                  <span className="inline-block size-2" style={{ backgroundColor: c.color }} />
                )}
                {c.label}
              </button>
            );
          })}
          <span className="mx-3 h-3 w-px bg-rule" />
          <button
            type="button"
            onClick={all}
            className="text-sm text-ink-muted hover:text-ink"
          >
            Todas
          </button>
          <button
            type="button"
            onClick={none}
            className="text-sm text-ink-muted hover:text-ink"
          >
            Nenhuma
          </button>
        </div>
        <label className="flex items-center gap-3">
          <span className="text-sm text-ink-muted">
            Ordenar
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-bg px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((chunk) => (
            <motion.article
              key={chunk.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-4 bg-surface p-6"
            >
              <header className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-2 text-sm"
                  style={{ color: getCategoryColor(chunk.category) }}
                >
                  <span
                    className="inline-block size-2"
                    style={{ backgroundColor: getCategoryColor(chunk.category) }}
                  />
                  {getCategoryLabel(chunk.category)}
                </span>
                <span className="text-sm tabular-nums text-ink-subtle">
                  {chunk.id}
                </span>
              </header>
              <p className="text-[15px] leading-relaxed text-ink">{chunk.text}</p>
              <footer className="flex flex-col gap-1 pt-2 text-sm text-ink-muted">
                <span className="font-semibold text-[15px] text-ink">
                  {chunk.source}
                </span>
                <span>{chunk.author}</span>
                <span className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar aria-hidden className="size-3" />
                    {chunk.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Hash aria-hidden className="size-3" />
                    {chunk.tokens} tokens
                  </span>
                </span>
              </footer>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center font-semibold text-xl text-ink-muted">
          Nenhuma categoria selecionada.
        </p>
      ) : (
        <p className="text-center text-sm text-ink-muted">
          {visible.length} de {corpus.length} chunks · {active.size} de{" "}
          {categories.length} categorias
        </p>
      )}
    </div>
  );
};
