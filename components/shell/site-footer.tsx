import Link from "next/link";

export const SiteFooter = () => {
  return (
    <footer className="mt-32 border-t border-rule bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="max-w-md">
          <p className="font-serif text-lg leading-snug text-ink">
            Um ensaio visual sobre RAG e MCP.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Sem APIs externas, sem back-end. Todos os vetores e trajetórias
            foram curados à mão para ilustrar os conceitos.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex gap-8 text-sm text-ink-muted">
          <Link href="/rag" className="hover:text-ink">
            Módulo RAG
          </Link>
          <Link href="/mcp" className="hover:text-ink">
            Módulo MCP
          </Link>
          <Link href="/sobre" className="hover:text-ink">
            Sobre
          </Link>
        </nav>
      </div>
    </footer>
  );
};
