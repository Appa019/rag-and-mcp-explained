import type { ReactNode } from "react";

type Props = {
  language?: string;
  children: ReactNode;
  caption?: string;
};

export const CodeBlock = ({ language, children, caption }: Props) => {
  return (
    <figure className="my-8 overflow-hidden bg-surface">
      {(language || caption) && (
        <figcaption className="flex items-center justify-between gap-4 px-4 pt-3 text-sm text-ink-muted">
          <span>{language ?? ""}</span>
          {caption ? <span>{caption}</span> : null}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-ink">
        <code>{children}</code>
      </pre>
    </figure>
  );
};
