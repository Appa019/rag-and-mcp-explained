import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { ComparisonTable } from "@/components/mcp/comparison-table";

export const metadata: Metadata = {
  title: "Comparação",
  description:
    "Oito dimensões onde MCP e uma API tradicional divergem na prática — com detalhes clicáveis.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="03 · Comparação"
        title={<>Lado a lado, sem rodeios.</>}
        dek="Algumas das dimensões abaixo são sutis; outras, radicais. Clique em qualquer linha para ver o detalhe por trás da comparação."
      />

      <div className="mt-14 flex flex-col gap-10">
        <ComparisonTable />

        <Prose>
          <h2>O ponto que a tabela não cabe</h2>
          <p>
            MCP não é <em>sucessor</em> de API REST. É uma camada de
            contexto especializada para clientes que não sabem, de
            antemão, o que podem fazer — caso típico de um agente de IA. O
            servidor MCP frequentemente é apenas um verniz em cima de APIs
            REST que já existem.
          </p>
        </Prose>
      </div>
    </article>
  );
}
