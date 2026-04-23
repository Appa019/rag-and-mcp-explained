import type { ReactNode } from "react";
import { ProgressRail, type RailStep } from "@/components/ui/progress-rail";

type Props = {
  basePath: string;
  railTitle: string;
  steps: readonly RailStep[];
  children: ReactNode;
};

export const ModuleShell = ({ basePath, railTitle, steps, children }: Props) => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <div className="grid grid-cols-12 gap-x-8 md:gap-x-12">
        <aside className="col-span-12 md:col-span-3 md:sticky md:top-10 md:self-start">
          <ProgressRail basePath={basePath} steps={steps} title={railTitle} />
        </aside>
        <div className="col-span-12 md:col-span-9 md:pl-6">{children}</div>
      </div>
    </div>
  );
};
