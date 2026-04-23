import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { VectorSpaceCanvas } from "@/components/three/vector-space-canvas";
import { corpus } from "@/lib/corpus";
import { dimensions, categories, getCategoryHex } from "@/lib/dimensions";

export const metadata: Metadata = {
  title: "Embeddings",
  description:
    "O que é um espaço vetorial, quantas dimensões ele tem na vida real, e por que a visualização 3D aqui é curada.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="02 · Embeddings"
        title={
          <>
            O texto vira <em className="italic text-ink-muted">ponto</em>.
          </>
        }
        dek="Todo chunk, depois de passar por um modelo de embedding, vira um vetor — uma lista de números. Esses números são coordenadas de um ponto em um espaço abstrato."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Na prática, o vetor não tem três ou oito dimensões como aqui. Os
            modelos de embedding populares devolvem 768, 1024, 1536, 3072
            dimensões — números de coordenadas que ninguém consegue
            visualizar direto.
          </p>
          <p>
            O que importa é a ideia: se dois pedaços de texto têm
            <em> significado parecido</em>, seus vetores aparecem próximos
            neste espaço. Similaridade semântica vira proximidade
            geométrica.
          </p>
        </Prose>

        <VectorSpaceCanvas
          chunks={corpus}
          height="540px"
          caption="Cada esfera é um chunk. Arraste para rotacionar, scroll para dar zoom. Passe o mouse em uma esfera para ler o trecho."
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
          <h2>As oito dimensões desta simulação</h2>
          <p>
            Cada chunk foi descrito aqui em oito eixos nomeados — uma
            simplificação radical de um vetor real, e de propósito. Como
            cada eixo tem significado, dá para olhar um vetor e dizer por
            que ele está onde está.
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
          <Callout variant="aside" title="Redução de dimensionalidade">
            A posição 3D de cada chunk é curada. Num sistema real, a
            projeção é feita por técnicas como PCA, t-SNE ou UMAP —
            algoritmos que tentam preservar a vizinhança do espaço
            original. Nenhum deles é perfeito; todos deformam algo.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
