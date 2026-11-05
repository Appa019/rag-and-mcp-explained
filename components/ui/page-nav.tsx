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
      className="mt-28 grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div>
        {prev ? (
          <Link href={prev.href} className="group flex items-start gap-3 py-3">
            <ArrowLeft
              aria-hidden
              className="mt-7 size-5 shrink-0 text-ink transition-transform group-hover:-translate-x-1 group-hover:text-accent"
            />
            <span className="flex flex-col">
              <span className="text-sm text-ink-muted">Anterior</span>
              <span className="mt-1 text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
                {prev.label}
              </span>
              {prev.hint ? (
                <span className="mt-1 text-[15px] leading-snug text-ink-muted">{prev.hint}</span>
              ) : null}
            </span>
          </Link>
        ) : null}
      </div>
      <div className="md:justify-self-end md:text-right">
        {next ? (
          <Link
            href={next.href}
            className="group flex items-start gap-3 py-3 md:flex-row-reverse"
          >
            <ArrowRight
              aria-hidden
              className="mt-7 size-5 shrink-0 text-ink transition-transform group-hover:translate-x-1 group-hover:text-accent"
            />
            <span className="flex flex-col md:items-end">
              <span className="text-sm text-ink-muted">Próximo</span>
              <span className="mt-1 text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
                {next.label}
              </span>
              {next.hint ? (
                <span className="mt-1 text-[15px] leading-snug text-ink-muted">{next.hint}</span>
              ) : null}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
};
