import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "Módulo MCP",
  description:
    "Abertura do módulo sobre MCP (Model Context Protocol): como uma LLM descobre e invoca ferramentas, e por que isso difere de uma API.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="Módulo 02 · Abertura"
        title={
          <>
            Não é uma <em className="italic text-ink-muted">API</em> — e o
            motivo importa.
          </>
        }
        dek="MCP parece mais um jeito de o modelo chamar um endpoint, mas o que ele padroniza é a descoberta. É aí que a analogia com API trava."
      />
      <div className="mt-16">
        <Prose>
          <p>
            Toda API tradicional parte de um pressuposto: alguém já leu a
            documentação, escreveu o código cliente e sabe que o endpoint{" "}
            <code>POST /orders</code> aceita um <code>customer_id</code>. O
            contrato é fixo em tempo de build.
          </p>
          <p>
            MCP inverte o ponto de partida. O modelo, em tempo de execução,
            pergunta ao servidor <em>quais ferramentas existem</em>, recebe
            de volta uma lista descrita em linguagem natural e decide sozinho
            qual usar. Ninguém precisou hardcodar.
          </p>
          <p>
            As cinco seções a seguir descrevem essa diferença peça por peça,
            com diagramas animados e uma tabela comparativa.
          </p>
          <h2>O que vem pela frente</h2>
          <ol className="mt-6 flex flex-col divide-y divide-rule border-y border-rule">
            {[
              {
                n: "01",
                title: "Anatomia de uma API",
                text: "O modelo mental que traz o vício: cliente, endpoint, contrato estático.",
                href: "/mcp/api-tradicional",
              },
              {
                n: "02",
                title: "Anatomia do MCP",
                text: "Cliente, servidor, ferramentas, recursos e prompts — tudo descoberto em runtime.",
                href: "/mcp/anatomia",
              },
              {
                n: "03",
                title: "Comparação",
                text: "Oito dimensões onde as duas abordagens divergem na prática.",
                href: "/mcp/comparacao",
              },
              {
                n: "04",
                title: "Tool calling",
                text: "O fluxo completo de uma invocação, passo a passo, vista do lado do modelo.",
                href: "/mcp/tool-calling",
              },
              {
                n: "05",
                title: "Quando usar",
                text: "Uma árvore de decisão curta para escolher entre MCP, API tradicional ou uma mistura das duas.",
                href: "/mcp/decisao",
              },
            ].map((item) => (
              <li key={item.href} className="py-5">
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-6"
                >
                  <span className="font-mono text-[11px] text-ink-subtle">
                    {item.n}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-serif text-2xl leading-tight text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 text-[15px] leading-snug text-ink-muted">
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="mt-2 size-4 text-ink-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink"
                  />
                </Link>
              </li>
            ))}
          </ol>
          <Callout variant="note" title="Contexto">
            MCP (Model Context Protocol) é a especificação aberta da
            Anthropic para padronizar como modelos falam com servidores
            externos. O foco aqui é <em>mental</em>: o que ele representa,
            não a sintaxe.
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
