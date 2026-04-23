import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { TraditionalApiDiagram } from "@/components/mcp/traditional-api-diagram";

export const metadata: Metadata = {
  title: "Anatomia de uma API REST",
  description:
    "Componentes e fluxo de uma API REST: cliente, endpoint, contrato fixo e exemplo de requisição.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="01 · API REST"
        title="Anatomia de uma API REST"
        dek="Uma API REST expõe endpoints HTTP cujos contratos são conhecidos antes do build. O cliente sabe o endereço, os verbos, os parâmetros e o formato da resposta."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            O ciclo de uma chamada REST tem quatro passos fixos. O
            cliente monta a requisição com base no contrato pré-conhecido
            (verbo HTTP, caminho, corpo). Envia para o servidor. O
            servidor executa a lógica associada ao endpoint e devolve
            uma resposta estruturada. O cliente lê o status HTTP e o
            corpo da resposta.
          </p>
        </Prose>

        <TraditionalApiDiagram />

        <Prose>
          <h2>Contrato pré-conhecido</h2>
          <p>
            O cliente conhece o contrato antes da execução. Esse
            conhecimento chega por:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>
              uma especificação OpenAPI ou Swagger, lida em build time
              para gerar SDK ou tipos;
            </li>
            <li>
              documentação humana (um portal de developer, um PDF, um
              Notion interno);
            </li>
            <li>
              inspeção manual de chamadas existentes via proxy HTTP.
            </li>
          </ul>
          <p>
            Se o endpoint muda (novo campo obrigatório, rota renomeada,
            código de erro diferente), o cliente precisa ser atualizado.
            O versionamento serve para dar aviso-prévio dessas quebras:{" "}
            <code>/v1/orders</code> convive com <code>/v2/orders</code>{" "}
            até que os clientes migrem.
          </p>

          <h2>Exemplo</h2>
        </Prose>

        <CodeBlock language="typescript" caption="Cliente TypeScript típico">
          {`type CreateOrderBody = {
  customerId: string;
  items: { sku: string; qty: number }[];
};

type OrderResponse = {
  id: string;
  total: number;
  status: "pending" | "confirmed" | "failed";
};

const response = await fetch("https://api.exemplo.com/v1/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: \`Bearer \${token}\`,
  },
  body: JSON.stringify(body satisfies CreateOrderBody),
});

if (!response.ok) {
  throw new Error(\`Falha na requisição: \${response.status}\`);
}

const order = (await response.json()) as OrderResponse;`}
        </CodeBlock>

        <Prose>
          <p>
            Os tipos <code>CreateOrderBody</code> e{" "}
            <code>OrderResponse</code> descrevem o contrato. Um agente
            que quisesse usar essa API precisaria receber do desenvolvedor
            a lista de endpoints disponíveis, os tipos de entrada e saída,
            e os valores aceitáveis para cada campo. É essa dependência
            de contexto prévio que o MCP remove.
          </p>
          <Callout variant="aside" title="Onde a API REST continua sendo a escolha certa">
            Quando o cliente é humano ou uma aplicação que pode ser
            deployada junto com o contrato, o rigor de uma API REST
            traduz previsibilidade. Em sistemas críticos (pagamentos,
            saúde, regulatório), esse rigor é desejável. MCP não pretende
            substituir APIs REST nesses casos.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
