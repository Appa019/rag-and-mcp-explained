import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O que o site cobre, como os dados foram construídos e em que difere de um sistema em produção.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader
        eyebrow="Sobre"
        title="O que o site faz e como os dados foram construídos"
        dek="Nota sobre método, honestidade pedagógica e limites do modelo simulado."
      />
      <div className="mt-12">
        <Prose>
          <p>
            O site cobre dois conceitos: Retrieval-Augmented Generation
            (RAG) e Model Context Protocol (MCP). Cada módulo tem cinco
            seções sequenciais com visualizações interativas.
          </p>

          <h2>Dados do módulo RAG</h2>
          <p>
            O corpus tem 24 chunks divididos em seis categorias (ciência,
            história, geografia, cultura, tecnologia, economia), com
            quatro chunks por categoria. Cada chunk tem:
          </p>
          <ul className="my-4 list-disc space-y-1 pl-6">
            <li>o texto original em português,</li>
            <li>metadados (fonte, autor, data, contagem de tokens),</li>
            <li>um vetor com oito dimensões semânticas nomeadas,</li>
            <li>uma posição tridimensional usada na visualização.</li>
          </ul>
          <p>
            As oito dimensões são: temporal, geográfico, científico,
            cultural, tecnológico, histórico, numérico e afetivo. Cada
            dimensão é um valor entre zero e um que descreve o peso
            daquele eixo no chunk. O texto sobre a Bossa Nova, por
            exemplo, tem valor alto em cultural e afetivo, valor médio em
            temporal e histórico, e valor baixo em tecnológico e
            científico.
          </p>

          <h2>Por que dimensões nomeadas</h2>
          <p>
            Num sistema em produção, cada coordenada do vetor de
            embedding é opaca: a dimensão número 347 não tem nome nem
            significado isolado. A decisão aqui foi inverter isso para
            fins didáticos. Com eixos nomeados, o playground pode mostrar
            quais dimensões foram ativadas por uma consulta e como elas
            se alinham com os chunks recuperados.
          </p>
          <p>
            O custo dessa escolha é fidelidade estatística. O modelo
            simulado não tem ruído, não tem compressão, não tem as
            correlações inesperadas que aparecem em embeddings reais. A
            seção{" "}
            <Link href="/rag/embeddings" className="underline underline-offset-4">
              Embeddings
            </Link>{" "}
            explica como seria o comportamento com 1536 ou mais dimensões.
          </p>

          <h2>Dados do módulo MCP</h2>
          <p>
            O módulo MCP é inteiramente conceitual. Não depende de
            servidor MCP ativo nem de chamadas reais de tool. Os
            diagramas mostram a sequência de mensagens JSON-RPC que um
            cliente e um servidor trocariam, com payloads ilustrativos.
          </p>

          <h2>Infraestrutura</h2>
          <p>
            O site é estático. Não há banco vetorial, nem servidor de
            modelo, nem chave de API. A renderização 3D usa{" "}
            <code>@react-three/fiber</code> com carregamento preguiçoso,
            e é substituída por uma projeção 2D quando o navegador
            reporta <code>prefers-reduced-motion</code>.
          </p>

          <Callout variant="aside" title="Limitações">
            Os vetores são determinísticos e escolhidos para que cada
            consulta do playground tenha um top-k claro. Num sistema
            real, a proximidade entre chunks é enviesada pelo corpus de
            treino do modelo de embedding e varia entre fornecedores
            (OpenAI, Cohere, Voyage, modelos abertos).
          </Callout>
        </Prose>
      </div>
    </div>
  );
}
