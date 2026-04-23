import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const modules = [
  {
    href: "/rag",
    number: "01",
    eyebrow: "Módulo um",
    title: "Retrieval-Augmented Generation",
    dek: "Chunking, embedding, indexação com metadados e o que realmente significa “dimensão semântica” — visto por dentro de um espaço vetorial 3D.",
    bullets: ["Chunking e overlap", "Espaço de embedding", "Indexação e metadados", "Dados dinâmicos", "Playground de recuperação"],
  },
  {
    href: "/mcp",
    number: "02",
    eyebrow: "Módulo dois",
    title: "MCP, Tools e APIs",
    dek: "Como uma LLM descobre e invoca ferramentas em tempo de execução, e por que isso não é a mesma coisa que “chamar uma API”.",
    bullets: ["Anatomia de uma API", "Anatomia do MCP", "Comparação lado a lado", "Fluxo de tool calling", "Quando usar cada um"],
  },
] as const;

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <section className="grid grid-cols-12 gap-x-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="col-span-12 md:col-span-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Ensaio visual · 2026
          </p>
          <h1 className="mt-8 font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.96] tracking-tight text-ink">
            Duas ideias
            <br />
            <em className="italic text-ink-muted">visuais</em> de IA,
            <br />
            desmontadas.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink md:text-xl">
            Este site faz uma coisa só: torna visível o que costuma ficar
            escondido atrás de diagramas chapados. De um lado, o espaço de
            embeddings de um RAG. Do outro, o que um servidor MCP troca com
            um modelo e por que isso difere de uma API.
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
            Nota do autor
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <p className="max-w-xl font-serif text-[22px] leading-[1.5] text-ink">
            Os vetores e trajetórias aqui são <em className="italic">curados</em>.
            Não há chamada de API em lugar nenhum, nem embedding da OpenAI
            escondido. A honestidade da didática, neste caso, ganha da
            fidelidade estatística.
          </p>
        </div>
      </section>
    </div>
  );
}
