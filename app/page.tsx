import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const modules = [
  {
    href: "/rag",
    number: "01",
    eyebrow: "Módulo 01",
    title: "Retrieval-Augmented Generation",
    dek: "Chunking, embeddings, indexação com metadados e similaridade cosseno explicadas por dentro de um espaço vetorial interativo.",
    bullets: [
      "Chunking e sobreposição",
      "Espaço de embedding em 3D",
      "Indexação e metadados",
      "Atualização do índice",
      "Consulta por similaridade",
    ],
  },
  {
    href: "/mcp",
    number: "02",
    eyebrow: "Módulo 02",
    title: "Model Context Protocol",
    dek: "Como um modelo de linguagem descobre e invoca ferramentas em tempo de execução, e quais são as diferenças em relação a uma API REST.",
    bullets: [
      "Anatomia de uma API REST",
      "Anatomia do MCP",
      "Comparação por dimensão",
      "Fluxo de tool calling",
      "Critérios de escolha",
    ],
  },
] as const;

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <section className="grid grid-cols-12 gap-x-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="col-span-12 md:col-span-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Material educacional
          </p>
          <h1 className="mt-8 font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98] tracking-tight text-ink">
            Retrieval-Augmented
            <br />
            Generation e
            <br />
            Model Context Protocol.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">
            O site cobre dois conceitos centrais em sistemas de IA
            aplicada. O primeiro módulo descreve como um RAG recupera
            trechos de texto relevantes a uma consulta: como os documentos
            são fatiados, convertidos em vetores, indexados e comparados.
            O segundo módulo descreve o MCP, protocolo usado para que
            modelos de linguagem descubram e invoquem ferramentas externas
            em tempo de execução, e compara o protocolo com uma API REST.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-x-8 gap-y-16 border-t border-rule pt-16 md:gap-y-0">
        {modules.map((mod, index) => (
          <article
            key={mod.href}
            className={`col-span-12 md:col-span-6 ${
              index === 0 ? "md:border-r md:border-rule md:pr-10" : "md:pl-10"
            }`}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                {mod.eyebrow}
              </span>
              <span className="font-mono text-[11px] tracking-wide text-ink-subtle">
                / {mod.number}
              </span>
            </div>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              {mod.title}
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-ink-muted">
              {mod.dek}
            </p>
            <ul className="mt-8 flex flex-col divide-y divide-rule border-y border-rule">
              {mod.bullets.map((b, i) => (
                <li
                  key={b}
                  className="flex items-baseline gap-4 py-3 text-[15px] text-ink"
                >
                  <span className="font-mono text-[11px] text-ink-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={mod.href}
              className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm tracking-wide text-ink transition-colors hover:border-highlight hover:text-highlight"
            >
              Entrar no módulo
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-12 gap-x-8 border-t border-rule pt-16 pb-8 mt-24">
        <div className="col-span-12 md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Sobre o método
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 text-[15.5px] leading-relaxed text-ink">
          <p>
            O site funciona inteiramente no navegador. Não há servidor de
            modelo, banco vetorial ou chamada de API externa. Todos os 24
            chunks do corpus foram descritos em oito dimensões semânticas
            nomeadas (temporal, geográfico, científico, cultural,
            tecnológico, histórico, numérico, afetivo). Cada consulta do
            playground tem um vetor curado nas mesmas oito dimensões.
          </p>
          <p className="mt-4">
            Essa escolha difere de um sistema real, em que cada dimensão
            do vetor é opaca e cada embedding tem 768, 1024, 1536 ou mais
            dimensões. A vantagem pedagógica é que, aqui, dá para olhar a
            barra lateral de uma consulta e dizer exatamente por que cada
            chunk foi recuperado. A seção <Link href="/sobre" className="underline underline-offset-4">Sobre</Link> detalha o trade-off.
          </p>
        </div>
      </section>
    </div>
  );
}
