import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Prose } from "@/components/ui/prose";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "Módulo MCP",
  description:
    "Introdução ao módulo sobre Model Context Protocol: protocolo de descoberta de ferramentas, diferenças em relação a APIs REST e fluxo de tool calling.",
};

export default function Page() {
  return (
    <article>
      <SectionHeader
        eyebrow="Módulo 02 · Abertura"
        title="Model Context Protocol"
        dek="MCP é uma especificação aberta, mantida pela Anthropic, que padroniza como clientes (modelos de linguagem, IDEs, agentes) descobrem e invocam ferramentas oferecidas por servidores externos em tempo de execução."
      />
      <div className="mt-16">
        <Prose>
          <p>
            Numa integração tradicional via API REST, o cliente precisa
            conhecer os endpoints antes do build: quais rotas existem,
            quais parâmetros aceitam, qual o formato da resposta. Esse
            contrato é descrito em OpenAPI ou equivalente e fica fixo até
            o próximo deploy.
          </p>
          <p>
            MCP remove a premissa de conhecimento prévio. O cliente se
            conecta a um servidor MCP e faz uma chamada de listagem
            (<code>tools/list</code>), que devolve o catálogo atual de
            ferramentas. Cada ferramenta vem com nome, descrição em
            linguagem natural e schema JSON dos argumentos. A partir
            daí, o cliente decide qual ferramenta invocar com qual
            argumento, usando uma chamada genérica (<code>tools/call</code>).
            As mensagens seguem o padrão JSON-RPC 2.0 sobre transporte
            stdio, SSE ou HTTP.
          </p>

          <h2>Conteúdo do módulo</h2>
          <ol className="mt-6 flex flex-col divide-y divide-rule border-y border-rule">
            {[
              {
                n: "01",
                title: "Anatomia de uma API REST",
                text: "Cliente, endpoint, contrato fixo e fluxo de requisição.",
                href: "/mcp/api-tradicional",
              },
              {
                n: "02",
                title: "Anatomia do MCP",
                text: "Cliente, servidor, ferramentas, recursos, prompts e o protocolo de descoberta.",
                href: "/mcp/anatomia",
              },
              {
                n: "03",
                title: "Comparação",
                text: "Oito dimensões em que API REST e MCP divergem, com notas para cada uma.",
                href: "/mcp/comparacao",
              },
              {
                n: "04",
                title: "Fluxo de tool calling",
                text: "Sequência completa de mensagens JSON-RPC entre cliente e servidor durante uma invocação.",
                href: "/mcp/tool-calling",
              },
              {
                n: "05",
                title: "Critérios de escolha",
                text: "Árvore de decisão curta sobre quando adotar MCP, API REST ou combinar os dois.",
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

          <Callout variant="note" title="Sobre a especificação">
            MCP está em versão estável desde novembro de 2024. A
            especificação completa, incluindo schemas JSON e
            implementações de referência, está em{" "}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              modelcontextprotocol.io
            </a>
            .
          </Callout>
        </Prose>
      </div>
    </article>
  );
}
