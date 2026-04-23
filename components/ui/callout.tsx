import type { ReactNode } from "react";

type Variant = "note" | "warn" | "aside";

type Props = {
  variant?: Variant;
  title?: string;
  children: ReactNode;
};

const styles: Record<Variant, { border: string; label: string; color: string }> = {
  note: {
    border: "border-accent",
    label: "Nota",
    color: "text-accent",
  },
  warn: {
    border: "border-warn",
    label: "Atenção",
    color: "text-warn",
  },
  aside: {
    border: "border-rule-strong",
    label: "À parte",
    color: "text-ink-muted",
  },
};

export const Callout = ({ variant = "note", title, children }: Props) => {
  const style = styles[variant];
  return (
    <aside
      role="note"
      className={`border-l-2 ${style.border} bg-surface px-6 py-5 my-8`}
    >
      <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${style.color}`}>
        {title ?? style.label}
      </p>
      <div className="mt-2 text-[15.5px] leading-relaxed text-ink">{children}</div>
    </aside>
  );
};
