import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { Formula } from "@/components/ui/formula";
import { ChunkingVisualizer } from "@/components/rag/chunking-visualizer";

export const metadata: Metadata = {
  title: "Chunking",
  description:
    "Fatiamento do texto em chunks de tamanho fixo com sobreposição, e o efeito de cada parâmetro.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="01 · Chunking"
        title="Chunking"
        dek="Antes de gerar embeddings, o texto precisa ser dividido em pedaços menores. O tamanho desses pedaços e a sobreposição entre eles determinam a qualidade da recuperação."
      />

      <div className="mt-14 flex flex-col gap-16">
        <Prose>
          <p>
            Um modelo de embedding opera sobre uma janela limitada de
            tokens e produz um único vetor por entrada. Se a entrada for
            um documento inteiro, o vetor resultante será uma média
            semântica sem foco: informação específica de um parágrafo se
            dissolve entre parágrafos adjacentes. Por isso o texto é
            fatiado antes da indexação.
          </p>
          <p>
            Dois parâmetros controlam o fatiamento: o tamanho do chunk
            (em caracteres ou tokens) e a sobreposição entre chunks
            consecutivos. Se o tamanho é{" "}
            <Formula tex="s" /> e a sobreposição é{" "}
            <Formula tex="o" />, o passo entre o início de um chunk e o
            próximo é <Formula tex="s - o" />, e a posição inicial do{" "}
            <Formula tex="k" />
            -ésimo chunk é:
          </p>
        </Prose>

        <Formula
          tex="\text{start}_k = k \cdot (s - o) \qquad k = 0, 1, 2, \dots"
          display
          label="posição inicial do k-ésimo chunk"
        />

        <Prose>
          <p>
            O número total de chunks gerados a partir de um texto de
            comprimento <Formula tex="L" /> é aproximadamente:
          </p>
        </Prose>

        <Formula
          tex="N \approx \left\lceil \frac{L - o}{s - o} \right\rceil"
          display
          label="número aproximado de chunks"
        />

        <Prose>
          <p>
            Quando a sobreposição é zero, a expressão se reduz a{" "}
            <Formula tex="N = \lceil L/s \rceil" />. Quando a sobreposição
            cresce, o número total de chunks também cresce, porque mais
            conteúdo é repetido entre chunks vizinhos.
          </p>
          <h2>Simulação</h2>
          <p>
            Use os controles abaixo para alterar o tamanho e a
            sobreposição sobre um texto de exemplo. As barras coloridas
            acima do texto mostram onde cada chunk começa e termina.
          </p>
        </Prose>

        <ChunkingVisualizer />

        <Prose>
          <h2>O que muda ao alterar os parâmetros</h2>
          <p>
            Aumentar o tamanho do chunk reduz o número total de chunks e
            preserva mais contexto em cada um, ao custo de diluir
            informação específica. Reduzir o tamanho aumenta a
            especificidade do vetor, ao custo de gerar um índice maior e
            mais ruidoso.
          </p>
          <p>
            A sobreposição existe para lidar com o caso em que uma frase
            importante cai exatamente na fronteira entre dois chunks. Com
            sobreposição zero, essa frase fica dividida. Com sobreposição
            igual a 10 ou 20% do tamanho, ela aparece inteira em pelo
            menos um dos chunks.
          </p>
          <Callout variant="note" title="Valores usados em produção">
            Em sistemas reais, tamanhos típicos vão de 200 a 800 tokens
            com sobreposição de 10 a 20%. A escolha depende do domínio:
            código costuma ser fatiado por limites de função, textos
            jurídicos costumam usar parágrafos inteiros, e transcrições
            costumam seguir marcadores temporais.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
