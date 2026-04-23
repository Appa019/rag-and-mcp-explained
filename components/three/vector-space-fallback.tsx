import { getCategoryHex, getCategoryLabel } from "@/lib/dimensions";
import type { Chunk, Vec3 } from "@/lib/types";

type Props = {
  chunks: readonly Chunk[];
  highlightIds?: readonly string[];
  query?: {
    coords3d: Vec3;
    label: string;
  };
};

const SIZE = 520;
const RANGE = 5;

const project = (coord: number, axis: "x" | "y") => {
  const half = SIZE / 2;
  const sign = axis === "y" ? -1 : 1;
  return half + sign * (coord / RANGE) * half;
};

export const VectorSpaceFallback = ({ chunks, highlightIds, query }: Props) => {
  const highlight = new Set(highlightIds ?? []);
  const hasHighlight = highlight.size > 0;

  return (
    <figure className="w-full border border-rule bg-surface p-6">
      <figcaption className="mb-4 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          Projeção 2D (XY)
        </span>
        <span className="font-mono text-[10.5px] text-warn">
          3D desativado por preferência de movimento reduzido
        </span>
      </figcaption>
      <svg
        role="img"
        aria-label="Espaço vetorial simulado, projeção 2D"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[560px]"
      >
        <rect
          x="0"
          y="0"
          width={SIZE}
          height={SIZE}
          fill="var(--color-bg)"
          stroke="var(--color-rule)"
        />
        <line
          x1={SIZE / 2}
          y1={0}
          x2={SIZE / 2}
          y2={SIZE}
          stroke="var(--color-rule)"
        />
        <line
          x1={0}
          y1={SIZE / 2}
          x2={SIZE}
          y2={SIZE / 2}
          stroke="var(--color-rule)"
        />
        {chunks.map((c) => {
          const cx = project(c.coords3d[0], "x");
          const cy = project(c.coords3d[1], "y");
          const isHl = highlight.has(c.id);
          const opacity = hasHighlight && !isHl ? 0.25 : 1;
          const r = isHl ? 10 : 7;
          return (
            <g key={c.id} opacity={opacity}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={getCategoryHex(c.category)}
              />
              {isHl ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={r + 8}
                  fill="none"
                  stroke={getCategoryHex(c.category)}
                  strokeWidth="1"
                  opacity={0.3}
                />
              ) : null}
            </g>
          );
        })}
        {query ? (
          <g>
            <circle
              cx={project(query.coords3d[0], "x")}
              cy={project(query.coords3d[1], "y")}
              r={9}
              fill="#111111"
            />
            <text
              x={project(query.coords3d[0], "x") + 12}
              y={project(query.coords3d[1], "y") + 4}
              fontFamily="monospace"
              fontSize="10"
              fill="#111111"
            >
              {query.label}
            </text>
          </g>
        ) : null}
      </svg>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {Array.from(new Set(chunks.map((c) => c.category))).map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted"
          >
            <span
              className="inline-block size-2"
              style={{ backgroundColor: getCategoryHex(cat) }}
            />
            {getCategoryLabel(cat)}
          </span>
        ))}
      </div>
    </figure>
  );
};
