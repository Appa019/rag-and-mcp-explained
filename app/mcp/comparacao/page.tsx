import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { ComparisonTable } from "@/components/mcp/comparison-table";

export const metadata: Metadata = {
  title: "Comparação entre API REST e MCP",
  description:
    "Oito dimensões em que API REST e MCP divergem, com detalhamento clicável.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="03 · Comparação"
        title="Comparação entre API REST e MCP"
        dek="A tabela lista oito dimensões em que as duas abordagens divergem. Cada linha pode ser expandida para ler o detalhe."
      />

      <div className="mt-14 flex flex-col gap-10">
        <ComparisonTable />

        <Prose>
          <h2>Coexistência</h2>
          <p>
            MCP e API REST não se excluem. Muitos servidores MCP em uso
            hoje são camadas finas sobre APIs REST existentes: o servidor
            recebe a chamada MCP, traduz para uma ou mais chamadas REST
            internas e devolve o resultado formatado. Esse padrão permite
            expor sistemas já existentes para clientes agentivos sem
            reescrever a lógica de negócio.
          </p>
          <p>
            A maior parte das divergências listadas acima vem da
            diferença de público-alvo: APIs REST são projetadas para
            desenvolvedores que escrevem clientes, MCP é projetado para
            modelos que escolhem ferramentas em tempo de execução.
          </p>
        </Prose>
      </div>
    </article>
  );
}
