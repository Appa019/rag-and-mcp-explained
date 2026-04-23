import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { Formula } from "@/components/ui/formula";
import { VectorSpaceCanvas } from "@/components/three/vector-space-canvas";
import { corpus } from "@/lib/corpus";
import { dimensions, categories, getCategoryHex } from "@/lib/dimensions";

export const metadata: Metadata = {
  title: "Embeddings",
  description:
    "Definição de embedding, distância cosseno, dimensionalidade e a redução para 3D usada na visualização.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="02 · Embeddings"
        title="Embeddings"
        dek="Um embedding é um vetor de números que representa um pedaço de texto. A proximidade entre dois embeddings indica similaridade semântica entre os textos originais."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Um modelo de embedding recebe um texto e devolve um vetor de
            dimensão fixa. Para um chunk <Formula tex="d" /> de um
            documento, o modelo produz:
          </p>
        </Prose>

        <Formula
          tex="\vec{d} = \phi(d) \in \mathbb{R}^n"
          display
          label="função de embedding"
        />

        <Prose>
          <p>
            O valor de <Formula tex="n" /> depende do modelo. Os modelos
            mais usados em produção atualmente produzem vetores com 768,
            1024, 1536 ou 3072 dimensões. A propriedade que torna esses
            vetores úteis é a seguinte: dois textos com significado
            parecido são projetados em vetores próximos no espaço.
          </p>

          <h2>Medindo proximidade</h2>
          <p>
            A medida mais comum de proximidade em RAG é a similaridade
            cosseno. Dados dois vetores <Formula tex="\vec{q}" /> e{" "}
            <Formula tex="\vec{d}" />, ela é definida como o cosseno do
            ângulo <Formula tex="\theta" /> entre eles:
          </p>
        </Prose>

        <Formula
          tex="\text{sim}(\vec{q}, \vec{d}) = \cos\theta = \frac{\vec{q} \cdot \vec{d}}{\|\vec{q}\|\,\|\vec{d}\|}"
          display
          label="similaridade cosseno"
        />

        <Prose>
          <p>
            O numerador é o produto escalar. O denominador é o produto
            das normas dos dois vetores. Em componentes:
          </p>
        </Prose>

        <Formula
          tex="\vec{q} \cdot \vec{d} = \sum_{i=1}^{n} q_i\, d_i"
          display
          label="produto escalar"
        />

        <Formula
          tex="\|\vec{v}\| = \sqrt{\sum_{i=1}^{n} v_i^{\,2}}"
          display
          label="norma L2"
        />

        <Prose>
          <p>
            A similaridade cosseno sempre cai no intervalo{" "}
            <Formula tex="[-1, 1]" />. Vale 1 quando os vetores apontam
            exatamente na mesma direção, 0 quando são ortogonais e −1
            quando apontam em direções opostas. Em embeddings de texto
            produzidos por modelos treinados em larga escala, os valores
            típicos ficam acima de 0,5 para pares relacionados e acima de
            0,85 para pares quase equivalentes.
          </p>

          <h2>Visualização</h2>
          <p>
            O espaço abaixo mostra 24 chunks posicionados em três
            coordenadas. Cada esfera é um chunk, e as cores indicam a
            categoria. Arraste para rotacionar e aproxime com o scroll.
            Ao passar o ponteiro sobre uma esfera, o trecho aparece.
          </p>
        </Prose>

        <VectorSpaceCanvas
          chunks={corpus}
          height="540px"
          caption="Cada esfera é um chunk. Arraste para rotacionar, use o scroll para dar zoom."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {categories.map((c) => {
            const n = corpus.filter((ch) => ch.category === c.key).length;
            return (
              <div
                key={c.key}
                className="flex flex-col gap-1 border-t-2 pt-3"
                style={{ borderColor: getCategoryHex(c.key) }}
              >
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                  style={{ color: getCategoryHex(c.key) }}
                >
                  {c.label}
                </span>
                <span className="font-serif text-2xl text-ink">{n}</span>
                <span className="font-mono text-[11px] text-ink-muted">
                  chunks
                </span>
              </div>
            );
          })}
        </div>

        <Prose>
          <h2>Dimensionalidade real e redução</h2>
          <p>
            Na visualização acima, cada ponto tem três coordenadas. Num
            sistema em produção, os pontos vivem em{" "}
            <Formula tex="\mathbb{R}^{1536}" /> ou{" "}
            <Formula tex="\mathbb{R}^{3072}" />, que a nossa visão não
            consegue representar direto. A redução para 2D ou 3D é feita
            por algoritmos como PCA, t-SNE e UMAP, que tentam preservar a
            vizinhança original: pontos próximos no espaço original
            continuam próximos após a projeção, com alguma deformação
            inevitável.
          </p>

          <h2>As oito dimensões deste modelo simulado</h2>
          <p>
            Os vetores usados no site têm oito dimensões, com rótulos
            fixos. Cada valor é um número entre zero e um que indica a
            intensidade daquela dimensão no chunk.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {dimensions.map((d, i) => (
              <li
                key={d.key}
                className="flex items-baseline gap-3 border-t border-rule pt-3"
              >
                <span className="font-mono text-[11px] text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-serif text-[17px] text-ink">
                    {d.label}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-muted">
                    {d.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <Callout variant="aside" title="Diferença em relação a produção">
            Num sistema real, as dimensões não têm nome. A dimensão
            número 347 de um embedding da OpenAI captura correlações
            aprendidas pelo modelo, sem interpretação humana direta. O
            uso de dimensões nomeadas aqui facilita a leitura da
            recuperação, ao custo de não reproduzir as correlações
            inesperadas de um espaço aprendido por gradiente.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
