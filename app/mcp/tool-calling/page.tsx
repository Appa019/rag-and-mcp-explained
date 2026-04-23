import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { ToolCallingFlow } from "@/components/mcp/tool-calling-flow";

export const metadata: Metadata = {
  title: "Fluxo de tool calling",
  description:
    "Sequência de mensagens JSON-RPC trocadas entre cliente MCP e servidor durante uma invocação de ferramenta.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="04 · Tool calling"
        title="Fluxo de tool calling"
        dek="A sequência abaixo mostra, passo a passo, o que acontece entre o usuário, o cliente MCP (uma LLM) e o servidor MCP durante uma invocação de ferramenta. Clique em cada passo para ver o payload JSON-RPC."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            O exemplo é fictício mas segue a ordem exata de chamadas de
            uma interação real. O usuário faz uma pergunta que depende
            de dados atuais. A LLM identifica essa necessidade, pede o
            catálogo de ferramentas ao servidor, escolhe a ferramenta
            apropriada, monta os argumentos, invoca a ferramenta, recebe
            o resultado e formula a resposta final.
          </p>
          <p>
            O protocolo usa JSON-RPC 2.0: cada mensagem é um objeto JSON
            com campos <code>jsonrpc</code>, <code>id</code>,{" "}
            <code>method</code> e <code>params</code> (ou{" "}
            <code>result</code> nas respostas).
          </p>
        </Prose>

        <ToolCallingFlow />

        <Prose>
          <h2>Observações</h2>
          <p>
            O papel do cliente MCP vai além de só encaminhar chamadas.
            A escolha da ferramenta depende da leitura que a LLM faz
            das descrições em linguagem natural. O preenchimento dos
            argumentos depende de inferir valores a partir da pergunta
            original. Se o cliente for mal ajustado, a mesma ferramenta
            pode ser invocada com argumentos diferentes entre execuções.
          </p>
          <p>
            Também não há obrigação de usar uma única ferramenta. A LLM
            pode encadear múltiplas chamadas (uma ferramenta de busca
            seguida de uma de resumo, por exemplo) antes de formular a
            resposta. Cada chamada é independente do ponto de vista do
            servidor, mas pertence à mesma sessão do lado do cliente.
          </p>
          <Callout variant="note" title="JSON-RPC e LSP">
            O MCP herda muitas convenções do Language Server Protocol
            (LSP), que é o protocolo usado entre editores e servidores
            de linguagem. Ambos usam JSON-RPC 2.0, ambos dependem de
            descoberta em runtime, e ambos operam sobre conexões
            persistentes. LSP serve editores; MCP serve LLMs.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
