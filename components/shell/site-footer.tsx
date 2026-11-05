import Link from "next/link";

const link = "text-base text-ink transition-colors hover:text-accent";

export const SiteFooter = () => {
  return (
    <footer className="mt-40 bg-bg">
      <div className="mx-auto max-w-6xl px-6 pb-10 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="max-w-md text-base leading-relaxed text-ink-muted md:col-span-6">
            Site estático, sem banco vetorial nem chamada de API. Os vetores
            foram descritos à mão em oito dimensões nomeadas, para que dê
            para ler por que cada trecho foi recuperado.
          </p>
          <nav aria-label="Rodapé" className="flex flex-col gap-3 md:col-span-3">
            <Link href="/rag" className={link}>Módulo RAG</Link>
            <Link href="/mcp" className={link}>Módulo MCP</Link>
            <Link href="/sobre" className={link}>Método e limites</Link>
          </nav>
          <div className="flex flex-col gap-3 md:col-span-3">
            <a href="https://github.com/Appa019/rag-and-mcp-explained" className={link}>
              Código no GitHub
            </a>
            <a href="https://pedropestana.dev" className={link}>
              Pedro Pestana
            </a>
          </div>
        </div>
        <p
          aria-hidden
          className="type-display mt-24 whitespace-nowrap text-[clamp(2.5rem,15vw,12rem)] text-ink"
        >
          RAG × MCP
        </p>
      </div>
    </footer>
  );
};
