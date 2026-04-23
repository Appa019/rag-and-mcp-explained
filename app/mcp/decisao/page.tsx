import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { DecisionTree } from "@/components/mcp/decision-tree";

export const metadata: Metadata = {
  title: "Quando usar cada um",
  description:
    "Uma árvore curta de perguntas para escolher entre MCP, API tradicional, ou as duas coisas juntas.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="05 · Decisão"
        title={<>Três perguntas até a resposta.</>}
        dek="Nem todo projeto precisa de MCP, nem todo projeto precisa de uma API tradicional, e alguns precisam dos dois. A árvore abaixo serve como bússola rápida."
      />

      <div className="mt-14 flex flex-col gap-14">
        <DecisionTree />

        <Prose>
          <h2>Notas à parte</h2>
          <p>
            A árvore é deliberadamente simplificada. Na prática, existem
            fatores como latência, autenticação entre serviços,
            observabilidade e maturidade do ecossistema MCP que podem
            empurrar a decisão para um lado ou para o outro.
          </p>
          <Callout variant="aside" title="Não é um ou outro">
            MCP e REST convivem. Muitos servidores MCP interessantes são
            pequenas camadas em cima de APIs REST existentes —
            aproveitando a robustez do que já estava construído e
            adicionando a camada de contexto que a LLM precisa.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
