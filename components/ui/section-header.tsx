import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  dek?: ReactNode;
};

export const SectionHeader = ({ title, dek }: Props) => {
  return (
    <header className="flex flex-col items-start gap-6">
      <h1 className="type-display text-[clamp(2rem,8vw,3.5rem)] text-ink">
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
