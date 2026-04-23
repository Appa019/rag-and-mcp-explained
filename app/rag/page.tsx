import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "Módulo RAG",
  description:
    "Introdução ao módulo sobre Retrieval-Augmented Generation: chunking, embeddings, indexação, atualização e consulta por similaridade.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="Módulo 01 · Abertura"
        title="Retrieval-Augmented Generation"
        dek="RAG é a técnica que permite a um modelo de linguagem responder perguntas sobre documentos que não estavam no corpus de treino. O módulo cobre cada etapa do pipeline, da preparação do texto até a consulta final."
      />
      <div className="mt-16">
        <Prose>
          <p>
            Um modelo de linguagem só sabe o que aprendeu durante o
            treino. Qualquer sistema aplicado precisa responder perguntas
            sobre conteúdo mais recente ou privado: manuais, notas
            fiscais, e-mails internos, jurisprudência. RAG (Retrieval-Augmented Generation)
            é o nome dado ao mecanismo que busca trechos relevantes
            desses documentos e os anexa ao prompt enviado ao modelo.
          </p>
          <p>
            O pipeline tem cinco etapas. A primeira fatia os documentos
            em pedaços pequenos (chunks). A segunda converte cada chunk
            em um vetor de números (embedding). A terceira guarda os
            vetores num índice junto com metadados estruturados. A quarta
            mantém esse índice atualizado conforme novos documentos
            chegam. A quinta recebe a consulta do usuário, converte em
            vetor também e busca os chunks mais próximos por similaridade.
          </p>
          <h2>Conteúdo do módulo</h2>
          <ol className="mt-6 flex flex-col divide-y divide-rule border-y border-rule">
            {[
              {
                n: "01",
                title: "Chunking",
                text: "Fatiamento do texto em pedaços de tamanho controlado, com sobreposição.",
                href: "/rag/chunking",
              },
              {
                n: "02",
                title: "Embeddings",
                text: "Conversão de cada chunk em vetor e o que são as dimensões desse vetor.",
                href: "/rag/embeddings",
              },
              {
                n: "03",
                title: "Indexação e metadados",
                text: "Armazenamento dos vetores com etiquetas de fonte, data, autor e categoria.",
                href: "/rag/indexing",
              },
              {
                n: "04",
                title: "Dados dinâmicos",
                text: "Inserção, atualização e expiração de chunks ao longo do tempo.",
                href: "/rag/dynamic",
              },
              {
                n: "05",
                title: "Playground",
                text: "Consulta guiada: uma pergunta entra, a similaridade cosseno seleciona os três chunks mais próximos.",
                href: "/rag/playground",
              },
            ].map((item) => (
              <li key={item.href} className="py-5">
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-6"
                >
                  <span className="font-mono text-[11px] text-ink-subtle">
                    {item.n}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-serif text-2xl leading-tight text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 text-[15px] leading-snug text-ink-muted">
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="mt-2 size-4 text-ink-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink"
                  />
                </Link>
              </li>
            ))}
          </ol>
          <Callout variant="aside" title="Nota sobre o modelo simulado">
            Todos os vetores usados no módulo foram curados com oito
            dimensões semânticas nomeadas. A página{" "}
            <Link href="/sobre" className="underline underline-offset-4">
              Sobre
            </Link>{" "}
            descreve em que isso difere de um sistema real com 1536 ou
            mais dimensões.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
