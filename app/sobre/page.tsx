import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Sobre o projeto, método e honestidade didática.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader
        eyebrow="Sobre"
        title={<>Um ensaio, não um produto.</>}
        dek="Por que este site existe, o que ele afirma e o que ele não afirma."
      />
      <div className="mt-12">
        <Prose>
          <p>
            Duas ideias que se repetem em toda conversa sobre IA aplicada são
            especialmente mal explicadas no material introdutório:{" "}
            <strong>recuperação por similaridade</strong> (RAG) e a{" "}
            <strong>descoberta de ferramentas em tempo de execução</strong>{" "}
            (MCP).
          </p>
          <p>
            No primeiro caso, diagramas com setas bonitas escondem que
            <em> embeddings são vetores</em> e que o espaço onde vivem tem
            centenas de dimensões — não três. No segundo, artigos tratam MCP
            como “mais uma API”, o que ignora justamente o que o torna
            diferente.
          </p>
          <h2>O que este site faz</h2>
          <p>
            Reduz as duas ideias a interações visuais, em vez de texto
            teórico. Você pode clicar em cada peça e ver o que ela faz no
            conjunto.
          </p>
          <h2>O que este site não faz</h2>
          <p>
            Não chama nenhuma API. Não hospeda modelo. Não faz embeddings de
            verdade. Todos os vetores foram curados à mão em oito dimensões
            semânticas <em>nomeadas</em>, para que cada eixo signifique
            alguma coisa interpretável — oposto de um vetor real de 1536
            dimensões, onde nenhum eixo tem nome.
          </p>
          <Callout variant="aside" title="Trade-off consciente">
            Perde-se realismo estatístico. Em troca, ganha-se
            interpretabilidade: você vê exatamente por que um chunk foi
            escolhido pela consulta. Na produção, a explicação é opaca.
          </Callout>
        </Prose>
      </div>
    </div>
  );
}
