"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type RailStep = {
  slug: string;
  label: string;
  hint?: string;
};

type Props = {
  basePath: string;
  steps: readonly RailStep[];
  title?: string;
};

export const ProgressRail = ({ basePath, steps, title }: Props) => {
  const pathname = usePathname();
  const normalizedBase = basePath.replace(/\/$/, "");

  return (
    <nav aria-label="Seções do módulo" className="w-full">
      {title ? (
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {title}
        </p>
      ) : null}
      <ol className="flex flex-col">
        {steps.map((step, index) => {
          const href = step.slug === "" ? normalizedBase : `${normalizedBase}/${step.slug}`;
          const isActive =
            pathname === href ||
            (step.slug !== "" && pathname?.startsWith(`${href}/`));
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={step.slug} className="relative">
              <Link
                href={href}
                className={`group grid grid-cols-[auto_1fr] gap-4 py-3.5 transition-opacity ${
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`font-mono text-[11px] leading-snug tracking-wide ${
                    isActive ? "text-highlight" : "text-ink-muted"
                  }`}
                >
                  {number}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`font-serif text-[17px] leading-tight ${
                      isActive ? "text-ink" : "text-ink"
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.hint ? (
                    <span className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">
                      {step.hint}
                    </span>
                  ) : null}
                </span>
              </Link>
              {index < steps.length - 1 ? (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-rule" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
