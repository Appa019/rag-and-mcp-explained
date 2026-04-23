import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { DecisionTree } from "@/components/mcp/decision-tree";

export const metadata: Metadata = {
  title: "Critérios de escolha",
  description:
    "Quando adotar MCP, quando adotar uma API REST, e quando combinar os dois.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="05 · Decisão"
        title="Critérios de escolha"
        dek="A árvore abaixo guia a decisão entre MCP, API REST ou combinação dos dois, a partir de três perguntas sobre o cliente da integração e o cenário de uso."
      />

      <div className="mt-14 flex flex-col gap-14">
        <DecisionTree />

        <Prose>
          <h2>Fatores não cobertos pela árvore</h2>
          <p>
            A árvore prioriza o tipo de cliente e a estabilidade do
            contrato. Em decisões reais, outros fatores pesam:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>
              <strong>Latência</strong>. Servidores MCP remotos sobre
              HTTP têm overhead comparável a uma API REST convencional.
              Servidores locais sobre stdio são mais rápidos que chamadas
              HTTP, com custo de precisar rodar junto ao cliente.
            </li>
            <li>
              <strong>Autenticação</strong>. APIs REST têm um vocabulário
              maduro (OAuth, tokens, mTLS). MCP delega ao transporte.
              Para cenários multi-tenant, isso exige cuidado adicional
              na modelagem do servidor.
            </li>
            <li>
              <strong>Observabilidade</strong>. Ferramentas maduras de
              tracing e métricas existem para HTTP. Em MCP, a
              observabilidade ainda está sendo formalizada, com SDKs
              adicionando suporte a OpenTelemetry em 2025.
            </li>
            <li>
              <strong>Maturidade do ecossistema</strong>. Há mais
              servidores MCP abertos para casos comuns (filesystem, git,
              GitHub, Slack, Postgres) do que havia em 2024, mas o
              catálogo ainda é menor do que o de bibliotecas REST
              estabelecidas.
            </li>
          </ul>

          <Callout variant="aside" title="Padrão híbrido">
            Em sistemas maduros, o mesmo domínio costuma ser exposto
            duas vezes: por uma API REST para clientes humanos e scripts
            determinísticos, e por um servidor MCP para agentes. Os dois
            pontos de entrada compartilham a mesma camada de lógica de
            negócio, mudando apenas a forma de apresentação.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
