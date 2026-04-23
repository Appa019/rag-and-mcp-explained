import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { ToolCallingFlow } from "@/components/mcp/tool-calling-flow";

export const metadata: Metadata = {
  title: "Tool calling",
  description:
    "O fluxo completo de uma invocação de ferramenta via MCP, passo a passo — descoberta, escolha, execução e retorno.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="04 · Tool calling"
        title={
          <>
            Uma frase no chat, <em className="italic text-ink-muted">oito</em>{" "}
            trocas debaixo.
          </>
        }
        dek="Do lado do usuário, é só perguntar e receber resposta. Por baixo, o cliente MCP e o servidor executam um protocolo coreografado — descoberta, escolha, execução, retorno."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            O exemplo abaixo é fictício mas segue exatamente a ordem de
            chamadas de uma interação real. Clique em cada passo para ver
            o detalhe, incluindo o payload JSON-RPC trocado.
          </p>
        </Prose>

        <ToolCallingFlow />

        <Prose>
          <Callout variant="note" title="O que está em JSON-RPC">
            MCP usa JSON-RPC 2.0 como camada de mensagem. É o mesmo
            formato que o Language Server Protocol usa entre editores e
            compiladores — e, aliás, foi de lá que muitas das convenções
            do MCP foram emprestadas.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
