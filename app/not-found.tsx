import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 md:px-10 md:py-40">
      <h1 className="type-display text-[clamp(2.5rem,7vw,5.5rem)] text-ink">
        Página não encontrada
      </h1>
      <p className="max-w-lg text-lg leading-relaxed text-ink-muted">
        Erro 404: o endereço não corresponde a nenhuma das seções publicadas.
        Volte para o início ou escolha um dos módulos.
      </p>
      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Link href="/" className="button">
          Voltar ao início
        </Link>
        <Link href="/rag" className="link">
          Módulo RAG
        </Link>
        <Link href="/mcp" className="link">
          Módulo MCP
        </Link>
      </div>
    </div>
  );
}
