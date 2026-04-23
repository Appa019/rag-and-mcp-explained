import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 px-6 py-24 md:px-10 md:py-40">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        Erro 404
      </span>
      <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight text-ink">
        Página não encontrada.
      </h1>
      <p className="max-w-lg text-lg leading-relaxed text-ink-muted">
        O endereço não corresponde a nenhuma das seções publicadas. Volte
        para o início ou escolha um dos módulos abaixo.
      </p>
      <div className="flex flex-wrap gap-3 pt-4">
        <Link
          href="/"
          className="border border-ink bg-ink px-5 py-2.5 text-sm text-surface transition-opacity hover:opacity-85"
        >
          Início
        </Link>
        <Link
          href="/rag"
          className="border border-ink px-5 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-surface"
        >
          Módulo RAG
        </Link>
        <Link
          href="/mcp"
          className="border border-ink px-5 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-surface"
        >
          Módulo MCP
        </Link>
      </div>
    </div>
  );
}
