"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { comparisonRows as rows } from "@/lib/comparison";

export const ComparisonTable = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-surface">
      <header className="hidden grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b border-rule px-5 py-3 text-sm text-ink-muted md:grid">
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
                <span className="col-span-1 font-semibold text-[15px] leading-snug text-ink md:col-span-1">
                  {row.dimension}
                </span>
                <ChevronDown
                  aria-hidden
                  className={`mt-1 size-4 text-ink-muted transition-transform md:order-last ${
                    isOpen ? "rotate-180 text-ink" : ""
                  }`}
                />
                <span className="col-span-2 flex flex-col gap-1 md:col-span-1 md:block">
                  <span className="text-sm text-ink-subtle md:hidden">
                    API
                  </span>
                  <span className="text-[14px] leading-snug text-ink-muted">
                    {row.api}
                  </span>
                </span>
                <span className="col-span-2 flex flex-col gap-1 md:col-span-1 md:block">
                  <span className="text-sm text-ink-subtle md:hidden">
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
                      <p className="max-w-[60ch] font-semibold text-[15.5px] leading-[1.7] text-ink">
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
