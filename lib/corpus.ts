import corpusData from "@/public/data/corpus.json";
import promptsData from "@/public/data/prompts.json";
import type { Chunk, Prompt } from "@/lib/types";

export const corpus: readonly Chunk[] =
  corpusData.chunks as unknown as readonly Chunk[];

export const prompts: readonly Prompt[] =
  promptsData.prompts as unknown as readonly Prompt[];

export const getChunkById = (id: string): Chunk | undefined => {
  return corpus.find((c) => c.id === id);
};

export const getPromptById = (id: string): Prompt | undefined => {
  return prompts.find((p) => p.id === id);
};
