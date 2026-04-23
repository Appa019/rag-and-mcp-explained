import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "Módulo RAG",
  description:
    "Abertura do módulo sobre Retrieval-Augmented Generation: chunking, embedding, indexação, dados dinâmicos e recuperação por similaridade.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="Módulo 01 · Abertura"
        title={
          <>
            <em className="italic text-ink-muted">Recuperar</em> antes de
            responder.
          </>
        }
        dek="Quando um modelo de linguagem não sabe algo, alguém precisa ir buscar. RAG é a parte que vai buscar — e a forma como ela guarda e encontra muda tudo no resultado."
      />
      <div className="mt-16">
        <Prose>
          <p>
            A frase popular diz que uma LLM “só sabe o que leu durante o
            treino”. É uma meia-verdade útil: na prática, quase todo sistema
            de IA aplicado precisa consultar documentos que o modelo nunca
            viu — e-mails internos, jurisprudência, manuais, notas fiscais.
            RAG é o nome que se deu a esse mecanismo de busca.
          </p>
          <p>
            O que costuma sumir nos tutoriais, porém, é{" "}
            <em>como exatamente</em> o documento é recortado, transformado em
            vetor e depois encontrado de novo quando uma pergunta chega. As
            cinco seções a seguir mostram cada uma dessas peças sem esconder
            as decisões.
          </p>
          <h2>O que vem pela frente</h2>
          <ol className="mt-6 flex flex-col divide-y divide-rule border-y border-rule">
            {[
              {
                n: "01",
                title: "Chunking",
                text: "Por que cortar o texto importa, e o que o tamanho e a sobreposição mudam na qualidade da busca.",
                href: "/rag/chunking",
              },
              {
                n: "02",
                title: "Embeddings",
                text: "O salto conceitual: cada pedaço de texto vira um ponto num espaço com muitas dimensões.",
                href: "/rag/embeddings",
              },
              {
                n: "03",
                title: "Indexação e metadados",
                text: "Onde o vetor mora, que etiquetas ele carrega e como filtrar antes de comparar.",
                href: "/rag/indexing",
              },
              {
                n: "04",
                title: "Dados dinâmicos",
                text: "Um índice não é estático: documentos entram, expiram e são reindexados o tempo todo.",
                href: "/rag/dynamic",
              },
              {
                n: "05",
                title: "Playground",
                text: "Uma pergunta. Um caminho pelo espaço vetorial. As três páginas que respondem por ele.",
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
          <Callout variant="aside" title="Método">
            Tudo aqui é simulado, com vetores em oito dimensões nomeadas
            (temporal, científico, cultural, etc.). Isso não bate com
            produção — o trade-off está descrito em{" "}
            <Link href="/sobre" className="underline">
              Sobre
            </Link>
            .
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
