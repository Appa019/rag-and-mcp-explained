import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Prose = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`max-w-[68ch] space-y-5 text-[17px] leading-[1.75] text-ink [&_a]:underline [&_a]:decoration-rule-strong [&_a]:underline-offset-4 [&_a:hover]:decoration-accent [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-ink [&_code]:ring-1 [&_code]:ring-rule [&_em]:font-serif [&_em]:italic [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:mt-14 [&_h2]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-1 [&_strong]:font-semibold [&_strong]:text-ink ${className}`}
    >
      {children}
    </div>
  );
};
