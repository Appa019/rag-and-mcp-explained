import type { ReactNode } from "react";

type Variant = "note" | "warn" | "aside";

type Props = {
  variant?: Variant;
  title?: string;
  children: ReactNode;
};

const labels: Record<Variant, string> = {
  note: "Nota",
  warn: "Atenção",
  aside: "À parte",
};

export const Callout = ({ variant = "note", title, children }: Props) => {
  return (
    <aside role="note" className="my-10 bg-surface px-6 py-6 md:px-8">
      <p className={`font-semibold ${variant === "warn" ? "text-warn" : "text-ink"}`}>
        {title ?? labels[variant]}
      </p>
      <div className="mt-2 text-base leading-relaxed text-ink">{children}</div>
    </aside>
  );
};
