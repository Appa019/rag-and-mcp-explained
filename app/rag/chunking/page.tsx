import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { ChunkingVisualizer } from "@/components/rag/chunking-visualizer";

export const metadata: Metadata = {
  title: "Chunking",
  description:
    "Por que cortar o texto importa: tamanho, sobreposição e o que se perde e se ganha em cada combinação.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="01 · Chunking"
        title={<>Antes de qualquer vetor, uma tesoura.</>}
        dek="Nenhum embedding de um livro inteiro faz sentido. Para que a busca funcione, o texto precisa ser fatiado em pedaços pequenos o bastante para terem coerência — e sobrepostos o bastante para não perderem o contexto."
      />

      <div className="mt-14 flex flex-col gap-16">
        <Prose>
          <p>
            <em>Chunking</em> é o primeiro passo prático de qualquer RAG.
            Você pega um documento, decide um tamanho de corte e vai
            recortando em pedaços. Tamanho grande demais, e o vetor
            resultante vira uma média sem foco. Tamanho pequeno demais, e
            frases importantes ficam cortadas ao meio.
          </p>
          <p>
            A sobreposição existe justamente para mitigar o segundo
            problema: os chunks vizinhos se <em>emendam</em>. Se a
            sobreposição for de 30 caracteres, todo pedaço traz consigo os
            últimos 30 caracteres do chunk anterior.
          </p>
        </Prose>

        <ChunkingVisualizer />

        <Prose>
          <h2>O que mudar nos controles muda, na prática</h2>
          <p>
            Aumente o tamanho: menos chunks, cada um mais contextual, e o
            índice fica menor. Diminua: mais chunks, cada um mais preciso,
            mas o índice cresce e a busca fica mais ruidosa. Aumente o
            overlap: maior segurança de que uma consulta que caia na
            emenda ainda encontre o pedaço certo, ao custo de mais tokens
            redundantes no índice.
          </p>
          <Callout variant="note" title="Na produção">
            Tamanhos típicos giram entre 200 e 800 tokens com overlap de
            10 a 20%. A decisão depende do domínio: código costuma querer
            chunks curtos delimitados por função; jurisprudência costuma
            querer parágrafos inteiros.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
