import type { ReactNode } from "react";
import { ModuleShell } from "@/components/shell/module-shell";
import { PageNavAuto } from "@/components/shell/page-nav-auto";
import { mcpSections } from "@/lib/module-sections";

export default function McpLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleShell basePath="/mcp" railTitle="Módulo 02 · MCP" steps={mcpSections}>
      {children}
      <PageNavAuto basePath="/mcp" steps={mcpSections} />
    </ModuleShell>
  );
}
