import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { MetadataCards } from "@/components/rag/metadata-cards";

export const metadata: Metadata = {
  title: "Indexação e metadados",
  description:
    "Estrutura típica de uma entrada no índice vetorial, metadados associados e filtros pré e pós-similaridade.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="03 · Indexação"
        title="Indexação e metadados"
        dek="Cada chunk é armazenado junto com seu vetor e um conjunto de etiquetas estruturadas. Essas etiquetas permitem filtrar o espaço de busca antes de aplicar a similaridade."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Uma entrada típica no índice vetorial guarda:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>o texto original do chunk,</li>
            <li>o vetor de embedding,</li>
            <li>um identificador estável do documento de origem,</li>
            <li>autor, data de criação e data de expiração,</li>
            <li>uma ou mais etiquetas de categoria,</li>
            <li>o idioma e, muitas vezes, um hash do texto para deduplicação.</li>
          </ul>
          <p>
            Com esses metadados, é possível aplicar filtros antes ou
            depois do cálculo de similaridade. Filtro pré-similaridade
            reduz o espaço de busca: apenas chunks que satisfazem as
            condições (categoria X, data superior a Y) entram na
            comparação. Filtro pós-similaridade pega os top-k resultados
            e reaplica critérios, útil para reordenar por recência ou
            para excluir fontes depreciadas.
          </p>

          <h2>Filtros aplicados ao corpus</h2>
          <p>
            A grade abaixo mostra todos os 24 chunks do corpus simulado.
            Use os controles para alternar as categorias ativas e mudar a
            ordenação. A operação é equivalente a uma consulta do tipo
            &ldquo;me dê todos os chunks das categorias X e Y, ordenados
            por data decrescente&rdquo;, antes de qualquer cálculo
            vetorial.
          </p>
        </Prose>

        <MetadataCards />

        <Prose>
          <h2>Motores de índice</h2>
          <p>
            Em produção, o índice costuma rodar num banco vetorial
            especializado (Qdrant, Weaviate, Pinecone, Milvus) ou em uma
            extensão de banco relacional (pgvector no PostgreSQL). Esses
            motores oferecem busca aproximada do vizinho mais próximo
            (ANN, Approximate Nearest Neighbor), que é mais rápida do que
            a busca exata quando o corpus tem milhões de vetores.
          </p>
          <p>
            A maior parte dos motores aceita filtros de metadados
            integrados à busca vetorial, para que não seja necessário
            trazer todos os chunks candidatos e filtrar no cliente.
          </p>
          <Callout variant="aside" title="Pré versus pós-filtragem">
            Pré-filtragem é mais eficiente, porque reduz o espaço antes
            da comparação vetorial. Pós-filtragem permite regras mais
            complexas, como reranqueamento por recência ou diversificação
            de fontes nos top-k.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
