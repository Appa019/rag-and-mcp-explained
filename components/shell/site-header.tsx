import Link from "next/link";

const navLink = "py-2 text-base text-ink transition-colors hover:text-accent";

export const SiteHeader = () => {
  return (
    <header className="bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 md:px-10">
        <Link href="/" className="text-xl font-extrabold uppercase leading-none text-ink">
          RAG × MCP
        </Link>
        <nav aria-label="Navegação principal" className="flex items-center gap-6 md:gap-8">
          <Link href="/rag" className={navLink}>
            RAG
          </Link>
          <Link href="/mcp" className={navLink}>
            MCP
          </Link>
          <Link href="/sobre" className={`hidden md:inline-block ${navLink}`}>
            Sobre
          </Link>
          <a
            href="https://github.com/Appa019/rag-and-mcp-explained"
            className={navLink}
          >
            Código
          </a>
        </nav>
      </div>
    </header>
  );
};
