import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Target = {
  href: string;
  label: string;
  hint?: string;
};

type Props = {
  prev?: Target;
  next?: Target;
};

export const PageNav = ({ prev, next }: Props) => {
  return (
    <nav
      aria-label="Navegação entre seções"
      className="mt-20 grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-2"
    >
      <div className="md:col-span-1">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-start gap-3 border border-transparent bg-transparent px-1 py-3 transition-colors hover:border-rule"
          >
            <ArrowLeft
              aria-hidden
              className="mt-1 size-4 text-ink-muted transition-transform group-hover:-translate-x-1 group-hover:text-ink"
            />
            <span className="flex flex-col">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
                Anterior
              </span>
              <span className="font-serif text-[17px] leading-tight text-ink">
                {prev.label}
              </span>
              {prev.hint ? (
                <span className="mt-0.5 text-[13px] leading-snug text-ink-muted">
                  {prev.hint}
                </span>
              ) : null}
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden md:block" />
        )}
      </div>
      <div className="md:col-span-1 md:justify-self-end md:text-right">
        {next ? (
          <Link
            href={next.href}
            className="group flex items-start gap-3 border border-transparent bg-transparent px-1 py-3 transition-colors hover:border-rule md:flex-row-reverse"
          >
            <ArrowRight
              aria-hidden
              className="mt-1 size-4 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-ink"
            />
            <span className="flex flex-col md:items-end">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
                Próximo
              </span>
              <span className="font-serif text-[17px] leading-tight text-ink">
                {next.label}
              </span>
              {next.hint ? (
                <span className="mt-0.5 text-[13px] leading-snug text-ink-muted">
                  {next.hint}
                </span>
              ) : null}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
};
