import { cosineSimilarity } from "@/lib/cosine";
import type { Chunk, QueryResult, Vec8 } from "@/lib/types";

export const topK = (
  queryVector: Vec8,
  corpus: readonly Chunk[],
  k = 3,
): QueryResult[] => {
  const scored = corpus.map((chunk) => ({
    chunkId: chunk.id,
    similarity: cosineSimilarity(queryVector, chunk.vector8d),
  }));
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, k).map((item, index) => ({
    chunkId: item.chunkId,
    similarity: item.similarity,
    rank: index + 1,
  }));
};

export const scoreAll = (
  queryVector: Vec8,
  corpus: readonly Chunk[],
): Map<string, number> => {
  const map = new Map<string, number>();
  for (const chunk of corpus) {
    map.set(chunk.id, cosineSimilarity(queryVector, chunk.vector8d));
  }
  return map;
};
