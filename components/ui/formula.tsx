import katex from "katex";

type Props = {
  tex: string;
  display?: boolean;
  label?: string;
};

export const Formula = ({ tex, display = false, label }: Props) => {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    output: "html",
    strict: "ignore",
    trust: false,
  });

  if (display) {
    return (
      <figure className="my-6 flex flex-col items-center gap-3 border border-rule bg-surface px-6 py-6">
        <div
          className="overflow-x-auto text-ink"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {label ? (
          <figcaption className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {label}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <span
      className="inline-block align-middle text-ink"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
