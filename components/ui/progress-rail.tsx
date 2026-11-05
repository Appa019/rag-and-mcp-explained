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
      {title ? <p className="mb-4 font-semibold text-ink">{title}</p> : null}
      <ol className="flex flex-col">
        {steps.map((step) => {
          const href = step.slug === "" ? normalizedBase : `${normalizedBase}/${step.slug}`;
          const isActive =
            pathname === href ||
            (step.slug !== "" && pathname?.startsWith(`${href}/`));

          return (
            <li key={step.slug}>
              <Link
                href={href}
                className="group flex flex-col py-2.5"
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`text-[17px] leading-tight transition-colors ${
                    isActive
                      ? "font-semibold text-accent"
                      : "text-ink group-hover:text-accent"
                  }`}
                >
                  {step.label}
                </span>
                {step.hint ? (
                  <span className="mt-1 text-sm leading-snug text-ink-muted">
                    {step.hint}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
