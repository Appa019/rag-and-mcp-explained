import Link from "next/link";

export const SiteHeader = () => {
  return (
    <header className="border-b border-rule bg-bg">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-serif text-[22px] leading-none tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          RAG <span className="text-ink-muted">×</span> MCP
        </Link>
        <nav aria-label="Navegação principal" className="flex items-center gap-8">
          <Link
            href="/rag"
            className="text-sm tracking-wide text-ink-muted transition-colors hover:text-ink"
          >
            RAG
          </Link>
          <Link
            href="/mcp"
            className="text-sm tracking-wide text-ink-muted transition-colors hover:text-ink"
          >
            MCP
          </Link>
          <Link
            href="/sobre"
            className="hidden text-sm tracking-wide text-ink-muted transition-colors hover:text-ink md:inline-block"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
};
