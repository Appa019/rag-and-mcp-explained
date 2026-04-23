export type DimensionKey =
  | "temporal"
  | "geografico"
  | "cientifico"
  | "cultural"
  | "tecnologico"
  | "historico"
  | "numerico"
  | "afetivo";

export type CategoryKey =
  | "ciencia"
  | "historia"
  | "geografia"
  | "cultura"
  | "tecnologia"
  | "economia";

export type Vec8 = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type Vec3 = readonly [number, number, number];

export type Chunk = {
  id: string;
  category: CategoryKey;
  text: string;
  source: string;
  author: string;
  date: string;
  tokens: number;
  vector8d: Vec8;
  coords3d: Vec3;
  color: string;
};

export type Prompt = {
  id: string;
  label: string;
  queryVector8d: Vec8;
  queryCoords3d: Vec3;
  activatedDimensions: readonly DimensionKey[];
  explanation: string;
};

export type Dimension = {
  key: DimensionKey;
  label: string;
  description: string;
};

export type Category = {
  key: CategoryKey;
  label: string;
  color: string;
};

export type QueryResult = {
  chunkId: string;
  similarity: number;
  rank: number;
};
