import type { ReactNode } from "react";

type Props = {
  language?: string;
  children: ReactNode;
  caption?: string;
};

export const CodeBlock = ({ language, children, caption }: Props) => {
  return (
    <figure className="my-8 overflow-hidden border border-rule bg-surface">
      {(language || caption) && (
        <figcaption className="flex items-center justify-between border-b border-rule px-4 py-2.5">
          {language ? (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">
              {language}
            </span>
          ) : (
            <span />
          )}
          {caption ? (
            <span className="text-[12px] text-ink-muted">{caption}</span>
          ) : null}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-ink">
        <code>{children}</code>
      </pre>
    </figure>
  );
};
