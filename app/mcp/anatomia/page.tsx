import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { McpAnatomyDiagram } from "@/components/mcp/mcp-anatomy-diagram";

export const metadata: Metadata = {
  title: "Anatomia do MCP",
  description:
    "Componentes de uma integração MCP: cliente, servidor, tools, resources, prompts e transporte.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="02 · Anatomia do MCP"
        title="Anatomia do MCP"
        dek="Um servidor MCP expõe três tipos de capacidade que podem ser consultadas em tempo de execução: tools (ações), resources (leituras) e prompts (templates). O cliente descobre o catálogo por uma chamada de listagem."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Uma integração MCP tem quatro componentes principais: o
            cliente, o servidor, o transporte que os conecta e o
            catálogo exposto pelo servidor.
          </p>
        </Prose>

        <McpAnatomyDiagram />

        <Prose>
          <h2>Cliente</h2>
          <p>
            É o processo que consome o catálogo. Em geral, uma LLM
            integrada a um agente ou a uma IDE. O cliente é universal: o
            mesmo código cliente se conecta a qualquer servidor MCP
            conforme a especificação, sem precisar de SDK específico.
          </p>

          <h2>Servidor</h2>
          <p>
            É o processo que expõe o catálogo. Pode ser um binário
            local, um container, um serviço remoto. A lógica do que cada
            ferramenta faz é responsabilidade do servidor. Do lado do
            cliente, a ferramenta aparece apenas como uma entrada na
            lista.
          </p>

          <h2>Transporte</h2>
          <p>
            A especificação define três transportes:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>
              <strong>stdio</strong>: o servidor é um processo filho do
              cliente, e a comunicação ocorre por stdin/stdout. Usado
              para servidores locais (ferramentas de sistema, acesso a
              arquivos, bancos de dados locais).
            </li>
            <li>
              <strong>Streamable HTTP</strong>: troca de mensagens HTTP
              com suporte a streaming de respostas e sessões
              persistentes. Usado para servidores remotos.
            </li>
            <li>
              <strong>SSE</strong> (Server-Sent Events): transporte mais
              antigo, mantido por compatibilidade.
            </li>
          </ul>
          <p>
            Em qualquer transporte, o formato das mensagens é JSON-RPC
            2.0.
          </p>

          <h2>Catálogo: tools, resources, prompts</h2>
          <p>
            <strong>Tools</strong> são ações. O cliente chama{" "}
            <code>tools/call</code> com o nome da ferramenta e os
            argumentos. O servidor executa e devolve o resultado.
            Podem alterar estado: enviar e-mail, criar ticket, rodar
            query de atualização.
          </p>
          <p>
            <strong>Resources</strong> são leitura. O cliente chama{" "}
            <code>resources/read</code> com uma URI identificadora e
            recebe o conteúdo. Equivalem aos endpoints{" "}
            <code>GET</code> de uma API, com a diferença de que o
            cliente descobre as URIs disponíveis por{" "}
            <code>resources/list</code>.
          </p>
          <p>
            <strong>Prompts</strong> são templates de mensagens. O
            servidor oferece receitas reutilizáveis com parâmetros, o
            cliente pede <code>prompts/get</code> e recebe uma
            sequência de mensagens já formatadas, que pode passar ao
            modelo diretamente.
          </p>

          <h2>Exemplo de resposta a tools/list</h2>
        </Prose>

        <CodeBlock language="json" caption="Resposta do servidor à chamada tools/list">
          {`{
  "tools": [
    {
      "name": "query_invoices",
      "description": "Consulta faturas por data de vencimento, status e cliente.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "due_date": { "type": "string", "format": "date" },
          "status": { "type": "string", "enum": ["open", "paid"] },
          "customer_id": { "type": "string" }
        },
        "required": ["due_date"]
      }
    },
    {
      "name": "send_email",
      "description": "Envia um e-mail para o endereço informado.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "to": { "type": "string", "format": "email" },
          "subject": { "type": "string" },
          "body": { "type": "string" }
        },
        "required": ["to", "subject", "body"]
      }
    }
  ]
}`}
        </CodeBlock>

        <Prose>
          <p>
            A descrição em linguagem natural de cada ferramenta é
            importante: ela é o sinal que a LLM usa para decidir qual
            chamar. Servidores bem escritos descrevem as ferramentas
            como se estivessem ensinando um programador novo, não como
            referência seca.
          </p>

          <Callout variant="aside" title="O que o cliente não precisa">
            Não precisa de SDK específico para cada servidor. Não
            precisa conhecer nomes de ferramentas em tempo de build.
            Não precisa atualizar código quando uma ferramenta nova é
            adicionada: ela aparece na próxima resposta a{" "}
            <code>tools/list</code>.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
