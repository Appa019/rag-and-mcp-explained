import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { McpAnatomyDiagram } from "@/components/mcp/mcp-anatomy-diagram";

export const metadata: Metadata = {
  title: "Anatomia do MCP",
  description:
    "Cliente, servidor e três tipos de capacidade expostas — tools, resources e prompts — tudo descoberto em runtime.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="02 · Anatomia do MCP"
        title={
          <>
            Um <em className="italic text-ink-muted">catálogo vivo</em> de
            capacidades.
          </>
        }
        dek="Em vez de um contrato fechado, o servidor MCP expõe três listas que o cliente consulta quando bem entender: ferramentas, recursos e prompts."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            Um servidor MCP é qualquer processo que fala o protocolo. Pode
            ser um binário local que lê arquivos, um serviço remoto que
            consulta um banco, um wrapper em cima de uma API que você já
            tinha. Esse servidor anuncia três coisas:
          </p>
        </Prose>

        <McpAnatomyDiagram />

        <Prose>
          <h2>Tools, resources e prompts</h2>
          <p>
            <strong>Tools</strong> são ações. O cliente chama, o servidor
            executa e retorna um resultado. Podem alterar estado — mandar
            um email, criar um ticket, rodar uma query de atualização.
          </p>
          <p>
            <strong>Resources</strong> são leitura. O cliente pede, o
            servidor entrega dados. Equivalem, grosso modo, aos{" "}
            <code>GET</code> de uma API, com a diferença de que o modelo
            descobre o que existe pelo mesmo mecanismo de listagem.
          </p>
          <p>
            <strong>Prompts</strong> são receitas — templates de mensagens
            parametrizáveis que o servidor oferece. Servem para encapsular
            interações que combinam múltiplas ferramentas em um fluxo
            recorrente.
          </p>
          <Callout variant="note" title="O que o cliente não precisa">
            Não precisa de SDK próprio para cada servidor. Não precisa
            conhecer nomes de ferramentas em tempo de compilação. Não
            precisa atualizar código quando uma ferramenta nova é
            adicionada ao servidor — ele aparece na próxima chamada a{" "}
            <code>list_tools()</code>.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
