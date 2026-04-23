import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { QueryPanel } from "@/components/rag/query-panel";

export const metadata: Metadata = {
  title: "Playground de consulta",
  description:
    "Escolha uma pergunta, veja o ponto da query no espaço vetorial e os três chunks mais próximos por similaridade cosseno.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="05 · Playground"
        title={<>Uma pergunta. Três respostas.</>}
        dek="Aqui todas as peças anteriores se encaixam: cada pergunta curada foi descrita nas mesmas oito dimensões dos chunks, e a similaridade cosseno resolve o resto."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            A matemática envolvida é enxuta. Cada chunk tem um vetor de oito
            números. Cada pergunta também. A similaridade cosseno é o
            ângulo entre esses dois vetores — mais precisamente, o cosseno
            do ângulo — e vai de −1 (opostos) a 1 (idênticos). O topo do
            ranking é quem tem o maior cosseno.
          </p>
        </Prose>

        <QueryPanel />

        <Prose>
          <h2>Por que as dimensões ajudam a explicar o resultado</h2>
          <p>
            Num sistema real, a pergunta “acende” os eixos em um vetor de
            1536 dimensões onde nenhum eixo tem nome. O cosseno continua
            funcionando, mas a explicação some.
          </p>
          <p>
            Aqui, como os eixos são nomeados, dá para ler a barra lateral e
            reconstruir a lógica: uma pergunta sobre Plano Real ativa
            histórico, temporal e numérico nessa ordem, e esses são
            exatamente os três eixos onde o chunk correspondente tem
            valores altos.
          </p>
          <Callout variant="note" title="No mundo real">
            Essa ponte entre eixos e explicações é uma área ativa de
            pesquisa. A interpretabilidade de embeddings é importante para
            auditoria — quando um RAG devolve algo errado, saber por que é
            metade do conserto.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
