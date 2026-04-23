import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { MetadataCards } from "@/components/rag/metadata-cards";

export const metadata: Metadata = {
  title: "Indexação e metadados",
  description:
    "Onde o vetor mora e que etiquetas ele carrega. Filtros pré-similaridade, metadados e o que entra no índice além do embedding.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="03 · Indexação"
        title={
          <>
            Um vetor, cercado de <em className="italic text-ink-muted">etiquetas</em>.
          </>
        }
        dek="Um índice de RAG não guarda só vetores. Guarda também origem, autor, data, categoria, contagem de tokens — informação estruturada que permite filtrar antes de comparar."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            A razão é prática. Imagine um bot de suporte técnico que tem
            acesso a toda a base de FAQ da empresa e, também, aos manuais
            de cinco produtos diferentes. Não adianta comparar o
            embedding da pergunta contra tudo — o mais razoável é filtrar
            primeiro pelo produto correto, pela data de publicação do
            manual, pelo idioma, e só depois rodar a similaridade.
          </p>
          <p>
            Metadados sobrem onde o vetor sozinho não alcança. Ordenação
            por data, agrupamento por fonte, exclusão de documentos
            depreciados — tudo isso é consulta estruturada tradicional,
            <em> não vetorial</em>.
          </p>
        </Prose>

        <MetadataCards />

        <Prose>
          <h2>O que vai num registro de índice</h2>
          <p>
            Em produção, cada entrada tende a carregar: o texto original
            do chunk, o vetor de embedding, o identificador estável do
            documento de origem, o autor, a data de criação, a data de
            expiração, uma ou mais etiquetas de categoria, o hash do
            conteúdo (para deduplicação), e o idioma. Bancos vetoriais
            modernos indexam tudo junto e permitem filtros híbridos.
          </p>
          <Callout variant="aside" title="Sobre a lógica de filtragem">
            O filtro <em>pré</em>-similaridade é o mais eficiente: reduz
            o espaço de busca antes da comparação vetorial. O filtro{" "}
            <em>pós</em>-similaridade gasta mais processamento, mas
            permite regras mais complexas — por exemplo, ranquear de
            novo os top-10 com base na data.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
