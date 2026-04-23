import type { ReactNode } from "react";
import { ModuleShell } from "@/components/shell/module-shell";
import { PageNavAuto } from "@/components/shell/page-nav-auto";
import { ragSections } from "@/lib/module-sections";

export default function RagLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleShell basePath="/rag" railTitle="Módulo 01 · RAG" steps={ragSections}>
      {children}
      <PageNavAuto basePath="/rag" steps={ragSections} />
    </ModuleShell>
  );
}
