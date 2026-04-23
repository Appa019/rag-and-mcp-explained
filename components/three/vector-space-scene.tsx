"use client";

import { useMemo, useState } from "react";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import type { Chunk, Vec3 } from "@/lib/types";
import { getCategoryHex, getCategoryLabel } from "@/lib/dimensions";

type Props = {
  chunks: readonly Chunk[];
  highlightIds?: readonly string[];
  query?: {
    coords3d: Vec3;
    label: string;
  };
  topKLines?: readonly { from: Vec3; to: Vec3; rank: number }[];
};

const axisColor = "#8a8a85";

export const VectorSpaceScene = ({ chunks, highlightIds, query, topKLines }: Props) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const highlight = useMemo(() => new Set(highlightIds ?? []), [highlightIds]);
  const hasHighlight = highlight.size > 0;

  return (
    <Canvas
      camera={{ position: [7, 5.5, 7], fov: 42 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 12, 6]} intensity={0.55} />
      <directionalLight position={[-6, -4, -6]} intensity={0.18} />

      <Axes />
      <GroundGrid />

      {chunks.map((chunk) => (
        <ChunkPoint
          key={chunk.id}
          chunk={chunk}
          isHovered={hoveredId === chunk.id}
          isHighlighted={highlight.has(chunk.id)}
          dimmed={hasHighlight && !highlight.has(chunk.id)}
          onHover={setHoveredId}
        />
      ))}

      {query ? <QueryMarker coords={query.coords3d} label={query.label} /> : null}

      {topKLines?.map((line) => (
        <DistanceLine
          key={`${line.from.join(",")}-${line.to.join(",")}-${line.rank}`}
          from={line.from}
          to={line.to}
          rank={line.rank}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={22}
        makeDefault
      />
    </Canvas>
  );
};

type ChunkPointProps = {
  chunk: Chunk;
  isHovered: boolean;
  isHighlighted: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
};

const ChunkPoint = ({ chunk, isHovered, isHighlighted, dimmed, onHover }: ChunkPointProps) => {
  const color = getCategoryHex(chunk.category);
  const scale = isHighlighted ? 1.55 : isHovered ? 1.3 : 1;
  const opacity = dimmed ? 0.25 : 1;

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(chunk.id);
  };
  const handleOut = () => onHover(null);

  return (
    <group position={chunk.coords3d}>
      <mesh onPointerOver={handleOver} onPointerOut={handleOut} scale={scale}>
        <sphereGeometry args={[0.14, 28, 28]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.45}
          metalness={0}
        />
      </mesh>
      {isHighlighted ? (
        <mesh scale={2.2}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
        </mesh>
      ) : null}
      {isHovered ? (
        <Html
          distanceFactor={10}
          position={[0, 0.35, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            className="w-[260px] border border-rule bg-surface px-3 py-2 text-[12.5px] leading-snug text-ink shadow-sm"
            style={{ borderLeftWidth: 2, borderLeftColor: color }}
          >
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span style={{ color }}>{getCategoryLabel(chunk.category)}</span>
              <span className="text-ink-muted">· {chunk.id}</span>
            </div>
            <div>{chunk.text.slice(0, 140)}{chunk.text.length > 140 ? "…" : ""}</div>
          </div>
        </Html>
      ) : null}
    </group>
  );
};

const QueryMarker = ({ coords, label }: { coords: Vec3; label: string }) => {
  return (
    <group position={coords}>
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#111111" roughness={0.2} />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#c2410c" transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <Html distanceFactor={10} position={[0, 0.45, 0]} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap border border-ink bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-surface">
          {label}
        </div>
      </Html>
    </group>
  );
};

const DistanceLine = ({ from, to, rank }: { from: Vec3; to: Vec3; rank: number }) => {
  const opacity = rank === 1 ? 0.75 : rank === 2 ? 0.5 : 0.3;
  return (
    <Line
      points={[new THREE.Vector3(...from), new THREE.Vector3(...to)]}
      color="#c2410c"
      lineWidth={rank === 1 ? 2 : 1.5}
      transparent
      opacity={opacity}
      dashed
      dashSize={0.22}
      gapSize={0.14}
    />
  );
};

const Axes = () => {
  return (
    <group>
      <Line
        points={[
          [-4.5, 0, 0],
          [4.5, 0, 0],
        ]}
        color={axisColor}
        lineWidth={1}
        transparent
        opacity={0.45}
      />
      <Line
        points={[
          [0, -4.5, 0],
          [0, 4.5, 0],
        ]}
        color={axisColor}
        lineWidth={1}
        transparent
        opacity={0.45}
      />
      <Line
        points={[
          [0, 0, -4.5],
          [0, 0, 4.5],
        ]}
        color={axisColor}
        lineWidth={1}
        transparent
        opacity={0.45}
      />
    </group>
  );
};

const GroundGrid = () => {
  const lines = useMemo(() => {
    const out: [number, number, number][][] = [];
    const span = 5;
    for (let i = -span; i <= span; i++) {
      out.push([
        [-span, -2, i],
        [span, -2, i],
      ]);
      out.push([
        [i, -2, -span],
        [i, -2, span],
      ]);
    }
    return out;
  }, []);
  return (
    <group>
      {lines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#c9c6be"
          lineWidth={0.5}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
};
