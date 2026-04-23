import type { Category, Dimension, DimensionKey } from "@/lib/types";

export const dimensions: readonly Dimension[] = [
  {
    key: "temporal",
    label: "Temporal",
    description: "Presença de datas, períodos, sequência, ciclos.",
  },
  {
    key: "geografico",
    label: "Geográfico",
    description: "Lugares, regiões, biomas, distâncias.",
  },
  {
    key: "cientifico",
    label: "Científico",
    description: "Mecanismos, causas, fenômenos observáveis.",
  },
  {
    key: "cultural",
    label: "Cultural",
    description: "Costumes, artes, linguagem, tradição.",
  },
  {
    key: "tecnologico",
    label: "Tecnológico",
    description: "Máquinas, protocolos, software, infraestrutura.",
  },
  {
    key: "historico",
    label: "Histórico",
    description: "Eventos ancorados no passado, figuras, consequências.",
  },
  {
    key: "numerico",
    label: "Numérico",
    description: "Grandezas, medidas, quantificação.",
  },
  {
    key: "afetivo",
    label: "Afetivo",
    description: "Subjetividade, experiência, valor simbólico.",
  },
] as const;

export const dimensionOrder: readonly DimensionKey[] = dimensions.map((d) => d.key);

export const categories: readonly Category[] = [
  { key: "ciencia", label: "Ciência", color: "var(--color-viz-1)" },
  { key: "historia", label: "História", color: "var(--color-viz-2)" },
  { key: "geografia", label: "Geografia", color: "var(--color-viz-3)" },
  { key: "cultura", label: "Cultura", color: "var(--color-viz-4)" },
  { key: "tecnologia", label: "Tecnologia", color: "var(--color-viz-5)" },
  { key: "economia", label: "Economia", color: "var(--color-viz-6)" },
] as const;

const categoryHexMap: Record<string, string> = {
  ciencia: "#1f3a5f",
  historia: "#c2410c",
  geografia: "#2f6b3e",
  cultura: "#6b21a8",
  tecnologia: "#0e7490",
  economia: "#b91c4f",
};

export const getCategoryHex = (key: string): string => {
  return categoryHexMap[key] ?? "#555555";
};

export const getDimensionLabel = (key: DimensionKey): string => {
  const dim = dimensions.find((d) => d.key === key);
  return dim ? dim.label : key;
};

export const getCategoryColor = (key: string): string => {
  const cat = categories.find((c) => c.key === key);
  return cat ? cat.color : "var(--color-ink-muted)";
};

export const getCategoryLabel = (key: string): string => {
  const cat = categories.find((c) => c.key === key);
  return cat ? cat.label : key;
};
