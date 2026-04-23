import type { RailStep } from "@/components/ui/progress-rail";

export const ragSections: readonly RailStep[] = [
  { slug: "", label: "Abertura", hint: "O problema que o RAG resolve" },
  { slug: "chunking", label: "Chunking", hint: "Fatiar o texto" },
  { slug: "embeddings", label: "Embeddings", hint: "Espaço vetorial 3D" },
  { slug: "indexing", label: "Indexação", hint: "Metadados e filtros" },
  { slug: "dynamic", label: "Dados dinâmicos", hint: "Índice em movimento" },
  { slug: "playground", label: "Playground", hint: "Consulta interativa" },
] as const;

export const mcpSections: readonly RailStep[] = [
  { slug: "", label: "Abertura", hint: "Por que MCP existe" },
  { slug: "api-tradicional", label: "Anatomia de uma API", hint: "Contrato rígido" },
  { slug: "anatomia", label: "Anatomia do MCP", hint: "Descoberta dinâmica" },
  { slug: "comparacao", label: "Comparação", hint: "Lado a lado" },
  { slug: "tool-calling", label: "Tool calling", hint: "Fluxo passo a passo" },
  { slug: "decisao", label: "Quando usar", hint: "Árvore de decisão" },
] as const;

type Target = { href: string; label: string; hint?: string };

export const getAdjacent = (
  sections: readonly RailStep[],
  basePath: string,
  currentSlug: string,
): { prev?: Target; next?: Target } => {
  const normalizedBase = basePath.replace(/\/$/, "");
  const toTarget = (step: RailStep): Target => ({
    href: step.slug === "" ? normalizedBase : `${normalizedBase}/${step.slug}`,
    label: step.label,
    hint: step.hint,
  });
  const idx = sections.findIndex((s) => s.slug === currentSlug);
  if (idx === -1) return {};
  const prevStep = idx > 0 ? sections[idx - 1] : undefined;
  const nextStep = idx < sections.length - 1 ? sections[idx + 1] : undefined;
  return {
    prev: prevStep ? toTarget(prevStep) : undefined,
    next: nextStep ? toTarget(nextStep) : undefined,
  };
};
