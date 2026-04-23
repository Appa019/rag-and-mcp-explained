import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 px-6 py-24 md:px-10 md:py-40">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        404 · não existe (ainda)
      </span>
      <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight text-ink">
        Esta página não<br />
        <em className="italic text-ink-muted">embedou</em> aqui.
      </h1>
      <p className="max-w-lg text-lg leading-relaxed text-ink-muted">
        Ou o endereço mudou, ou a seção ainda não foi escrita. Volte para
        o começo e escolha um módulo.
      </p>
      <div className="flex flex-wrap gap-3 pt-4">
        <Link
          href="/"
          className="border border-ink bg-ink px-5 py-2.5 text-sm text-surface transition-opacity hover:opacity-85"
        >
          Voltar ao início
        </Link>
        <Link
          href="/rag"
          className="border border-ink px-5 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-surface"
        >
          Ir para RAG
        </Link>
        <Link
          href="/mcp"
          className="border border-ink px-5 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-surface"
        >
          Ir para MCP
        </Link>
      </div>
    </div>
  );
}
