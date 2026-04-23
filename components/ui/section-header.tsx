import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  dek?: ReactNode;
  align?: "left" | "center";
};

export const SectionHeader = ({ eyebrow, title, dek, align = "left" }: Props) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <header className={`flex flex-col gap-5 ${alignClass}`}>
      {eyebrow ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-tight text-ink">
        {title}
      </h1>
      {dek ? (
        <p className="max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
          {dek}
        </p>
      ) : null}
    </header>
  );
};
