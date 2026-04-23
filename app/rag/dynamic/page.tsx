import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { DynamicIndexer } from "@/components/rag/dynamic-indexer";

export const metadata: Metadata = {
  title: "Dados dinâmicos",
  description:
    "Um índice em produção não é estático. Documentos são adicionados, reindexados e expiram o tempo todo.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="04 · Dados dinâmicos"
        title={
          <>
            O índice <em className="italic text-ink-muted">respira</em>.
          </>
        }
        dek="Toda a explicação anterior pressupôs um corpus parado. Em produção, documentos entram, envelhecem, são reescritos e saem — e o mecanismo de recuperação precisa lidar com esse fluxo."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Há três operações básicas que acontecem continuamente: inserir
            um chunk novo (<em>add</em>), reprocessar um chunk cujo texto
            mudou (<em>update</em>) e remover um chunk que deixou de ser
            válido (<em>remove</em>). Cada uma tem custo e trade-offs.
          </p>
        </Prose>

        <DynamicIndexer />

        <Prose>
          <h2>Quem decide o que entra e sai</h2>
          <p>
            A política varia. Alguns sistemas usam uma <em>janela
            deslizante</em>: tudo com mais de 90 dias some. Outros
            dependem de sinais de negócio — um produto foi descontinuado,
            os chunks daquele manual saem. Outros ainda fazem
            reindexação incremental: quando um documento é editado,
            apenas os chunks afetados são recomputados, não o corpus
            inteiro.
          </p>
          <Callout variant="note" title="Por que importa">
            Um índice estagnado vira uma mentira acumulada. A LLM vai
            continuar recuperando o documento antigo e respondendo com
            base nele, mesmo que a fonte original já tenha sido
            atualizada há semanas. A manutenção do índice é parte do
            produto, não uma tarefa de bastidores.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
