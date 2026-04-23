import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";
import { Formula } from "@/components/ui/formula";
import { QueryPanel } from "@/components/rag/query-panel";

export const metadata: Metadata = {
  title: "Playground de consulta",
  description:
    "Seleção de consulta, cálculo de similaridade cosseno e recuperação dos três chunks mais próximos.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="05 · Playground"
        title="Playground de consulta"
        dek="Cada consulta do playground tem um vetor curado nas mesmas oito dimensões dos chunks. Ao selecionar uma pergunta, o sistema calcula a similaridade cosseno da consulta contra os 24 chunks e mostra os três mais próximos."
      />

      <div className="mt-14 flex flex-col gap-14">
        <Prose>
          <p>
            O cálculo é idêntico ao descrito na seção de embeddings. Para
            uma consulta <Formula tex="\vec{q}" /> e cada chunk{" "}
            <Formula tex="\vec{d}_i" /> do corpus, calcula-se:
          </p>
        </Prose>

        <Formula
          tex="s_i = \frac{\vec{q} \cdot \vec{d}_i}{\|\vec{q}\|\,\|\vec{d}_i\|}"
          display
          label="similaridade da consulta com o i-ésimo chunk"
        />

        <Prose>
          <p>
            Os valores <Formula tex="s_i" /> são ordenados em ordem
            decrescente. Os primeiros <Formula tex="k" /> resultados são
            devolvidos. Aqui <Formula tex="k = 3" />, um valor comum em
            sistemas aplicados.
          </p>

          <h2>Interação</h2>
          <p>
            Selecione uma pergunta abaixo. A visualização 3D mostra a
            consulta como um octaedro preto, os três chunks mais próximos
            são destacados e as linhas tracejadas ligam a consulta a cada
            um deles. A lateral direita mostra o valor numérico de cada
            dimensão da consulta e quais dimensões foram acionadas.
          </p>
        </Prose>

        <QueryPanel />

        <Prose>
          <h2>Leitura do resultado</h2>
          <p>
            Cada consulta tem um comportamento esperado. Consultas
            científicas tendem a recuperar os quatro chunks da categoria
            Ciência, com decaimento de similaridade conforme o chunk se
            afasta do tópico exato. Consultas de domínio cruzado (por
            exemplo, sobre a Grande Depressão) tendem a misturar chunks
            de Economia e História, com similaridades menos concentradas.
          </p>
          <p>
            A barra das dimensões mostra, para cada um dos oito eixos, o
            valor numérico da consulta naquele eixo. Os eixos marcados
            como ativados na consulta são os que o modelo simulado
            considera dominantes para aquela pergunta, e são exibidos em
            cor de destaque.
          </p>
          <Callout variant="note" title="Interpretabilidade em produção">
            Em um sistema real, não há como atribuir nome a cada eixo do
            vetor de embedding. Para explicar por que um chunk foi
            recuperado, usa-se técnicas como reranqueamento com modelo
            cross-encoder, atribuição de saliência via gradiente ou
            comparação com pares de referência. A explicação fica mais
            aproximada e mais cara de calcular do que o que o playground
            mostra aqui.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
