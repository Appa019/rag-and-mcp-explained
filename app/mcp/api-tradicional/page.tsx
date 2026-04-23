import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { TraditionalApiDiagram } from "@/components/mcp/traditional-api-diagram";

export const metadata: Metadata = {
  title: "Anatomia de uma API",
  description:
    "O modelo mental clássico: cliente, endpoint, contrato estático. Tudo conhecido em build time.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="01 · API tradicional"
        title={<>O modelo mental que a maioria herdou.</>}
        dek="Uma API, no sentido clássico, é um conjunto de endpoints cujos contratos estão escritos em algum lugar — OpenAPI, Protobuf, um PDF antigo — e alguém escreve o cliente a partir desse contrato."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            O fluxo é sempre parecido: um cliente sabe o endereço, sabe o
            verbo HTTP, sabe os campos esperados no corpo. Monta a
            requisição, envia, lê a resposta. Se o endpoint mudar, alguém
            precisa atualizar o cliente antes que ele quebre.
          </p>
        </Prose>

        <TraditionalApiDiagram />

        <Prose>
          <h2>Exemplo concreto</h2>
        </Prose>

        <CodeBlock language="typescript" caption="Cliente hipotético">
          {`// O contrato precisa ser conhecido antes do build.
type CreateOrderBody = {
  customerId: string;
  items: { sku: string; qty: number }[];
};

const res = await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body satisfies CreateOrderBody),
});
const order = await res.json() as { id: string; total: number };`}
        </CodeBlock>

        <Prose>
          <p>
            Esse contrato <em>não é negociável em runtime</em>. Se o backend
            passar a exigir um novo campo, o cliente para de funcionar. Se
            o endpoint for renomeado, o cliente para de achar. É para isso
            que serve versionamento de API: dar aviso-prévio de quebra.
          </p>
          <Callout variant="aside" title="Por que isso funciona há décadas">
            O rigor do contrato é uma feature, não um bug. Em sistemas
            críticos — pagamentos, saúde, regulatório — a previsibilidade
            vale mais do que a flexibilidade. Não é desse lado que o MCP
            briga.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
