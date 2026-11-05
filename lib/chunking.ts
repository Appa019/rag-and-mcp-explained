// Character-budget chunking that never cuts inside a word.
// Kept free of path aliases and non-erasable syntax so `node --test` can import it directly.

export type TextChunk = {
  index: number;
  start: number;
  end: number;
  text: string;
  tokens: number;
};

export const chunkingSample =
  "No fim do século XIX, a cidade de São Paulo passou por uma transformação rápida: a substituição das tropas de muares pelas estradas de ferro, a chegada de imigrantes europeus e o início da industrialização na zona da Luz. Em poucas décadas, uma vila colonial acomodada no interior paulista virou o maior centro de consumo do Brasil. A explosão demográfica acompanhou o café, que saía do Vale do Paraíba em composições ferroviárias até o porto de Santos, de onde embarcava para a Europa e para os Estados Unidos. A cidade que ainda caminhava em torno do Largo de São Francisco ganhou avenidas, bondes elétricos e um primeiro perfil verticalizado.";

// Each chunk holds at most `size` characters and ends after a space (or at the end of the text).
// The next chunk starts up to `overlap` characters earlier, moved forward to the start of a word,
// so the real overlap is whole words and may be shorter than requested.
// A single word longer than `size` is the only case that gets a hard cut.
export const computeChunks = (text: string, size: number, overlap: number): TextChunk[] => {
  const chunks: TextChunk[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + size, text.length);
    if (end < text.length) {
      const space = text.lastIndexOf(" ", end - 1);
      if (space > start) end = space + 1;
    }
    const piece = text.slice(start, end);
    chunks.push({
      index: chunks.length,
      start,
      end,
      text: piece,
      tokens: Math.max(1, Math.round(piece.trimEnd().length / 4)),
    });
    if (end >= text.length) break;

    let next = Math.max(end - Math.max(0, overlap), start + 1);
    if (next < end && text[next - 1] !== " ") {
      const space = text.indexOf(" ", next);
      next = space === -1 || space + 1 > end ? end : space + 1;
    }
    start = next;
  }
  return chunks;
};

// Joins the chunks back, skipping the part of each one already covered by the previous chunk.
export const joinChunks = (chunks: readonly TextChunk[]): string => {
  let out = "";
  let covered = 0;
  for (const c of chunks) {
    out += c.text.slice(covered - c.start > 0 ? covered - c.start : 0);
    covered = c.end;
  }
  return out;
};
