import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { DynamicIndexer } from "@/components/rag/dynamic-indexer";

export const metadata: Metadata = {
  title: "Dados dinâmicos",
  description:
    "Inserção, atualização e expiração de chunks em um índice vetorial em produção.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="04 · Dados dinâmicos"
        title="Dados dinâmicos"
        dek="Um índice em produção raramente fica estático. Documentos novos chegam, documentos existentes são editados e documentos antigos expiram."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Três operações acontecem de forma contínua num índice vetorial:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>
              <strong>Inserção</strong>: um chunk novo é adicionado, com
              seu vetor e metadados.
            </li>
            <li>
              <strong>Atualização</strong>: o texto de um chunk mudou, o
              vetor é recalculado e a entrada existente é substituída.
            </li>
            <li>
              <strong>Remoção</strong>: o chunk deixa de ser válido e sai
              do índice, geralmente por política de retenção ou por
              exclusão do documento de origem.
            </li>
          </ul>
          <p>
            A simulação abaixo gera eventos a cada 1,8 segundo para
            ilustrar o fluxo. A barra lateral mostra quantos chunks
            existem em cada categoria, e as barras horizontais variam
            conforme inserções e remoções acontecem.
          </p>
        </Prose>

        <DynamicIndexer />

        <Prose>
          <h2>Políticas de retenção</h2>
          <p>
            A política define quando um chunk deve sair do índice. Três
            padrões comuns:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>
              <strong>Janela deslizante por idade</strong>: chunks com
              data de criação anterior a um limite (90, 180, 365 dias)
              são removidos automaticamente.
            </li>
            <li>
              <strong>Sinal de domínio</strong>: o chunk sai quando o
              sistema externo marca o documento como obsoleto (um produto
              descontinuado, uma norma revogada).
            </li>
            <li>
              <strong>Reindexação incremental</strong>: quando um
              documento é editado, apenas os chunks afetados são
              recomputados, não o documento inteiro. Reduz custo de
              embedding.
            </li>
          </ul>

          <h2>Consistência durante a atualização</h2>
          <p>
            Durante uma atualização, consultas podem cair entre os dois
            estados do índice e recuperar uma versão antiga do chunk. Há
            duas abordagens para lidar com isso: atualização atômica por
            transação (suportada por bancos vetoriais integrados a SQL) e
            versão explícita do documento, em que consultas filtram pela
            versão ativa e versões antigas são coletadas depois.
          </p>
          <Callout variant="note" title="Custo de embedding">
            Recomputar o vetor de um chunk consome tokens do modelo de
            embedding. Em índices grandes com atualizações frequentes, o
            custo de reindexação pode superar o custo das consultas de
            leitura. A escolha de chunk_size e overlap afeta diretamente
            esse custo.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
