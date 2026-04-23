"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { Chunk, Vec3 } from "@/lib/types";
import { VectorSpaceFallback } from "./vector-space-fallback";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (cb: () => void): (() => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const getReducedMotionSnapshot = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

const getServerSnapshot = (): boolean => false;

const Scene = dynamic(
  () =>
    import("./vector-space-scene").then((mod) => ({ default: mod.VectorSpaceScene })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-surface">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          carregando cena 3D…
        </span>
      </div>
    ),
  },
);

type Props = {
  chunks: readonly Chunk[];
  highlightIds?: readonly string[];
  query?: { coords3d: Vec3; label: string };
  topKLines?: readonly { from: Vec3; to: Vec3; rank: number }[];
  height?: string;
  caption?: string;
};

export const VectorSpaceCanvas = ({
  chunks,
  highlightIds,
  query,
  topKLines,
  height = "520px",
  caption,
}: Props) => {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );

  if (reducedMotion) {
    return (
      <VectorSpaceFallback
        chunks={chunks}
        highlightIds={highlightIds}
        query={query}
      />
    );
  }

  return (
    <figure className="flex flex-col gap-3">
      <div
        className="w-full border border-rule bg-surface"
        style={{ height }}
        role="img"
        aria-label="Visualização 3D interativa do espaço de embeddings simulado"
      >
        <Scene
          chunks={chunks}
          highlightIds={highlightIds}
          query={query}
          topKLines={topKLines}
        />
      </div>
      {caption ? (
        <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
