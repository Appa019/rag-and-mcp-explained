import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VectorSpaceCanvas } from "@/components/three/vector-space-canvas";
import { corpus, prompts } from "@/lib/corpus";
import { categories, dimensions } from "@/lib/dimensions";
import { comparisonRows } from "@/lib/comparison";
import { mcpSections, ragSections } from "@/lib/module-sections";

const ragTopics: Record<string, string> = {
  chunking: "Sliders de tamanho e sobreposição cortam um texto de exemplo em chunks.",
  embeddings: "Similaridade cosseno, produto escalar e norma L2, e o espaço vetorial em 3D.",
  indexing: "Os 24 chunks com filtro por categoria e ordenação por data ou tokens.",
  dynamic: "Inserções, atualizações e remoções no índice, com botão de pausa.",
  playground: "Oito perguntas prontas e os três chunks mais próximos de cada uma.",
};

const mcpTopics: Record<string, string> = {
  "api-tradicional": "Fluxo de requisição e contrato fixo em build time.",
  anatomia: "Cliente, servidor e transporte; tools, resources e prompts.",
  comparacao: "Oito dimensões em que REST e MCP divergem.",
  "tool-calling": "Nove passos com o payload JSON-RPC 2.0 de cada um.",
  decisao: "Árvore de decisão: MCP, API REST ou os dois.",
};

const facts = [
  { label: "Corpus", value: `${corpus.length} chunks em ${categories.length} categorias` },
  { label: "Vetores", value: `${dimensions.length} dimensões com nome` },
  { label: "Consultas", value: `${prompts.length} perguntas prontas` },
  { label: "Servidor", value: "nenhum: tudo roda no navegador" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <section aria-labelledby="titulo" className="pt-10 md:pt-16">
        <h1
          id="titulo"
          className="type-display text-[clamp(2.5rem,11.5vw,8.75rem)] text-ink"
        >
          <span className="mask-line"><span>RAG e MCP</span></span>
          <span className="mask-line"><span>por dentro</span></span>
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="enter-rise lg:col-span-4">
            <p className="text-xl leading-snug text-ink">
              Material interativo que mostra o que acontece dentro de um
              pipeline de RAG e em que o MCP difere de uma API REST.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/rag" className="button">
                Começar pelo RAG
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/mcp" className="link py-2 text-lg">
                Ir para o MCP
              </Link>
            </div>
          </div>
          <div className="enter-rise lg:col-span-8">
            <VectorSpaceCanvas
              chunks={corpus}
              height="min(520px, 62svh, 100vw)"
              zoom={false}
              caption="Os 24 chunks do corpus no espaço vetorial. Arraste para girar; passe o ponteiro numa esfera para ler o trecho."
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="rag" className="mt-40 md:mt-56">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="rag" className="reveal text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.05] text-ink">
              Do texto ao trecho recuperado
            </h2>
            <p className="reveal mt-6 text-lg leading-relaxed text-ink">
              O módulo de RAG segue o pipeline na ordem em que ele roda: fatiar
              os documentos, transformar cada pedaço em vetor, indexar com
              metadados, manter o índice atualizado e consultar por
              similaridade.
            </p>
            <ol className="mt-10 flex flex-col gap-1">
              {ragSections
                .filter((s) => s.slug)
                .map((s) => (
                  <li key={s.slug} className="reveal">
                    <Link href={`/rag/${s.slug}`} className="group block py-3">
                      <span className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                        {s.label}
                      </span>
                      <span className="mt-1 block text-base leading-snug text-ink-muted">
                        {ragTopics[s.slug]}
                      </span>
                    </Link>
                  </li>
                ))}
            </ol>
          </div>
          <figure className="reveal lg:col-span-7 lg:pt-2">
            <Image
              src="/home/playground.webp"
              width={2304}
              height={3000}
              unoptimized
              alt="Playground de consulta: a pergunta sobre fotossíntese, os três chunks mais próximos destacados no espaço 3D e a similaridade cosseno de cada um."
              className="h-auto w-full bg-surface"
            />
            <figcaption className="mt-3 text-sm text-ink-muted">
              Playground: a pergunta vira vetor e os três chunks mais
              próximos acendem no espaço.
            </figcaption>
          </figure>
        </div>
        <figure className="reveal mt-20">
          <Image
            src="/home/chunking.webp"
            width={2304}
            height={786}
            unoptimized
            alt="Simulador de chunking: seis barras coloridas e escalonadas marcam onde cada chunk começa e termina no texto, com a sobreposição entre vizinhos."
            className="h-auto w-full bg-surface"
          />
          <figcaption className="mt-3 text-sm text-ink-muted">
            Chunking: com 140 caracteres por chunk e 30 de sobreposição, o
            texto de exemplo vira seis chunks.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="mcp" className="mt-40 md:mt-56">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <h2 id="mcp" className="reveal text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.05] text-ink lg:col-span-6">
            API REST ou MCP
          </h2>
          <p className="reveal text-lg leading-relaxed text-ink lg:col-span-6">
            O módulo de MCP mostra como um modelo de linguagem descobre e chama
            ferramentas em tempo de execução, e compara o protocolo com uma
            API REST em oito pontos.
          </p>
        </div>

        <table className="mt-14 w-full border-collapse text-left">
          <caption className="sr-only">Diferenças entre API REST e MCP</caption>
          <thead className="hidden lg:table-header-group">
            <tr className="text-base text-ink-muted">
              <th scope="col" className="w-[34%] px-4 pb-4 font-normal">Dimensão</th>
              <th scope="col" className="w-[33%] px-4 pb-4 font-normal">API REST</th>
              <th scope="col" className="w-[33%] px-4 pb-4 font-normal">MCP</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((r) => (
              <tr key={r.dimension} className="reveal flex flex-col gap-1 px-4 py-5 odd:bg-surface lg:table-row lg:p-0">
                <th scope="row" className="text-xl font-semibold text-ink lg:px-4 lg:py-5 lg:align-top">
                  {r.dimension}
                </th>
                <td className="text-lg text-ink lg:px-4 lg:py-5 lg:align-top">
                  <span className="text-ink-muted lg:hidden">API REST: </span>
                  {r.api}
                </td>
                <td className="text-lg text-ink lg:px-4 lg:py-5 lg:align-top">
                  <span className="text-ink-muted lg:hidden">MCP: </span>
                  {r.mcp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <figure className="reveal lg:col-span-7">
            <Image
              src="/home/tool-calling.webp"
              width={2304}
              height={2580}
              unoptimized
              alt="Fluxo de tool calling: a lista de passos entre usuário, cliente e servidor MCP, com o payload JSON-RPC do passo aberto."
              className="h-auto w-full bg-surface"
            />
            <figcaption className="mt-3 text-sm text-ink-muted">
              Fluxo de tool calling: cada passo abre o JSON-RPC trocado.
            </figcaption>
          </figure>
          <ol className="flex flex-col gap-1 lg:col-span-5">
            {mcpSections
              .filter((s) => s.slug)
              .map((s) => (
                <li key={s.slug} className="reveal">
                  <Link href={`/mcp/${s.slug}`} className="group block py-3">
                    <span className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-base leading-snug text-ink-muted">
                      {mcpTopics[s.slug]}
                    </span>
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="metodo" className="mt-40 md:mt-56">
        <h2 id="metodo" className="reveal text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.05] text-ink">
          Vetores que dá para ler
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="reveal lg:col-span-7">
            <p className="text-[clamp(1.25rem,1.7vw,1.5rem)] leading-[1.4] text-ink">
              Cada chunk foi descrito à mão em oito dimensões com nome:
              temporal, geográfico, científico, cultural, tecnológico,
              histórico, numérico e afetivo. Num sistema real, um embedding tem
              768 a 3072 dimensões opacas. Aqui dá para olhar o vetor de uma
              consulta e dizer por que cada chunk foi recuperado.
            </p>
            <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-base text-ink-muted">{f.label}</dt>
                  <dd className="mt-1 text-lg text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/sobre" className="link mt-10 inline-block py-2 text-lg">
              Ler o método e os limites do modelo simulado
            </Link>
          </div>
          <figure className="reveal lg:col-span-5 lg:justify-self-end">
            <Image
              src="/home/dimensions.webp"
              width={864}
              height={1350}
              unoptimized
              alt="Painel de dimensões da pergunta sobre a chegada dos portugueses ao Brasil: histórico 0,95, temporal 0,85 e geográfico 0,70 acendem; as outras ficam perto de zero."
              className="h-auto w-full max-w-[400px] bg-surface"
            />
            <figcaption className="mt-3 max-w-[400px] text-sm text-ink-muted">
              O vetor da pergunta “Quando os portugueses chegaram ao Brasil?”,
              dimensão por dimensão.
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
