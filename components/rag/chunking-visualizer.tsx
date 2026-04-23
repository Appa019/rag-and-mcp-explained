"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleText =
  "No fim do século XIX, a cidade de São Paulo passou por uma transformação rápida: a substituição das tropas de muares pelas estradas de ferro, a chegada de imigrantes europeus e o início da industrialização na zona da Luz. Em poucas décadas, uma vila colonial acomodada no interior paulista virou o maior centro de consumo do Brasil. A explosão demográfica acompanhou o café, que saía do Vale do Paraíba em composições ferroviárias até o porto de Santos, de onde embarcava para a Europa e para os Estados Unidos. A cidade que ainda caminhava em torno do Largo de São Francisco ganhou avenidas, bondes elétricos e um primeiro perfil verticalizado.";

const CHUNK_COLORS = [
  "var(--color-viz-1)",
  "var(--color-viz-2)",
  "var(--color-viz-3)",
  "var(--color-viz-4)",
  "var(--color-viz-5)",
  "var(--color-viz-6)",
];

type Chunk = {
  index: number;
  start: number;
  end: number;
  text: string;
  tokens: number;
  color: string;
};

const computeChunks = (text: string, size: number, overlap: number): Chunk[] => {
  const step = Math.max(1, size - overlap);
  const chunks: Chunk[] = [];
  let i = 0;
  let idx = 0;
  while (i < text.length) {
    const end = Math.min(i + size, text.length);
    const piece = text.slice(i, end);
    chunks.push({
      index: idx,
      start: i,
      end,
      text: piece,
      tokens: Math.max(1, Math.round(piece.length / 4)),
      color: CHUNK_COLORS[idx % CHUNK_COLORS.length] ?? CHUNK_COLORS[0]!,
    });
    if (end >= text.length) break;
    i += step;
    idx += 1;
  }
  return chunks;
};

export const ChunkingVisualizer = () => {
  const [size, setSize] = useState(140);
  const [overlap, setOverlap] = useState(30);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chunks = useMemo(
    () => computeChunks(sampleText, size, overlap),
    [size, overlap],
  );

  const totalLen = sampleText.length;
  const totalTokens = chunks.reduce((s, c) => s + c.tokens, 0);
  const uniqueTokens = Math.round(totalLen / 4);
  const overhead = totalTokens - uniqueTokens;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Control
          label="Tamanho do chunk"
          unit="caracteres"
          value={size}
          min={60}
          max={280}
          step={10}
          onChange={setSize}
          hint="Pedaços menores são mais precisos na busca, mas perdem contexto."
        />
        <Control
          label="Sobreposição (overlap)"
          unit="caracteres"
          value={overlap}
          min={0}
          max={Math.floor(size * 0.5)}
          step={5}
          onChange={setOverlap}
          hint="Cola os chunks vizinhos para que frases partidas ao meio continuem encontráveis."
        />
      </div>

      <div className="rounded-none border border-rule bg-surface">
        <div className="flex items-center justify-between border-b border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          <span>
            {chunks.length} chunk{chunks.length === 1 ? "" : "s"}
          </span>
          <span>
            {totalTokens} tokens · {overhead > 0 ? `+${overhead} de repetição` : "sem repetição"}
          </span>
        </div>

        <div className="relative px-5 py-6">
          <div
            className="relative"
            style={{ height: `${Math.max(80, chunks.length * 28)}px` }}
          >
            <AnimatePresence mode="popLayout">
              {chunks.map((chunk) => {
                const left = (chunk.start / totalLen) * 100;
                const width = ((chunk.end - chunk.start) / totalLen) * 100;
                const top = chunk.index * 24;
                const active = hoveredIndex === chunk.index;
                return (
                  <motion.button
                    key={chunk.index}
                    type="button"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, delay: chunk.index * 0.02 }}
                    onMouseEnter={() => setHoveredIndex(chunk.index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(chunk.index)}
                    onBlur={() => setHoveredIndex(null)}
                    className="absolute flex h-5 items-center justify-start overflow-hidden px-2 font-mono text-[10px] tracking-wide outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-ink"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      top: `${top}px`,
                      backgroundColor: chunk.color,
                      color: "white",
                      opacity: hoveredIndex === null || active ? 1 : 0.35,
                    }}
                  >
                    <span>{String(chunk.index + 1).padStart(2, "0")}</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-rule px-5 py-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Texto-fonte
          </p>
          <p className="max-w-none text-[15px] leading-[1.8] text-ink">
            {chunks.map((chunk) => {
              const isHover = hoveredIndex === chunk.index;
              return (
                <span
                  key={chunk.index}
                  onMouseEnter={() => setHoveredIndex(chunk.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="transition-colors"
                  style={{
                    backgroundColor: isHover ? chunk.color : "transparent",
                    color: isHover ? "white" : "inherit",
                    padding: isHover ? "0 2px" : "0",
                    cursor: "default",
                  }}
                >
                  {chunk.text}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

type ControlProps = {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
};

const Control = ({ label, unit, value, min, max, step, onChange, hint }: ControlProps) => {
  const clamped = Math.min(max, Math.max(min, value));
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {label}
        </span>
        <span className="font-mono text-base tabular-nums text-ink">
          {clamped}
          <span className="ml-1 text-xs text-ink-muted">{unit}</span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none bg-rule [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ink [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink"
      />
      {hint ? <span className="text-[13px] leading-snug text-ink-muted">{hint}</span> : null}
    </label>
  );
};
