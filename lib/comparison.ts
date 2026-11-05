// Shared by the comparison page and the home page.
export type ComparisonRow = {
  dimension: string;
  api: string;
  mcp: string;
  detail: string;
};

export const comparisonRows: readonly ComparisonRow[] = [
  {
    dimension: "Descoberta de capacidades",
    api: "Em build time, via SDK",
    mcp: "Em runtime, via tools/list",
    detail:
      "Em uma API REST, o conjunto de endpoints precisa ser conhecido antes do deploy do cliente. A adição de um endpoint exige atualização do cliente. Em MCP, uma ferramenta nova aparece na próxima resposta a tools/list, sem necessidade de mudança no código cliente.",
  },
  {
    dimension: "Contrato",
    api: "Schema fixo, versionado (OpenAPI)",
    mcp: "JSON Schema por tool + descrição em linguagem natural",
    detail:
      "A API descreve seu contrato em OpenAPI, Protobuf ou equivalente, fixo até o próximo deploy. O MCP devolve o JSON Schema de cada ferramenta junto com a listagem. A descrição textual da ferramenta é o sinal que a LLM usa para decidir qual invocar.",
  },
  {
    dimension: "Transporte",
    api: "HTTP ou gRPC",
    mcp: "stdio, Streamable HTTP ou SSE",
    detail:
      "API REST quase sempre usa HTTP. MCP define três transportes. stdio é usado para servidores locais rodando como processo filho do cliente. Streamable HTTP e SSE são usados para servidores remotos. O conteúdo trafegado é JSON-RPC 2.0 em todos os casos.",
  },
  {
    dimension: "Cliente",
    api: "Escrito à mão por integração",
    mcp: "Cliente universal (LLM, IDE, agente)",
    detail:
      "Cada novo serviço REST costuma exigir um cliente próprio, com código específico para os endpoints daquele serviço. Um cliente MCP fala com qualquer servidor MCP que respeite a especificação, sem código específico por servidor.",
  },
  {
    dimension: "Estado",
    api: "Sem estado por requisição",
    mcp: "Sessão persistente por conexão",
    detail:
      "REST assume statelessness. MCP mantém uma conexão de longa duração. Isso permite streaming de progresso de tools em execução, cancelamento cooperativo e assinatura de notificações.",
  },
  {
    dimension: "Autenticação",
    api: "Headers, tokens, OAuth",
    mcp: "Delegada ao transporte e a capabilities",
    detail:
      "Em API REST, a autenticação é responsabilidade do cliente a cada chamada. Em MCP, a sessão é autenticada uma vez no transporte. O servidor pode também declarar que certas ferramentas exigem permissões adicionais, que o cliente precisa confirmar antes de invocá-las.",
  },
  {
    dimension: "Evolução",
    api: "Versionamento, breaking changes",
    mcp: "Adição de tool é compatível",
    detail:
      "Adicionar um endpoint novo em REST costuma exigir versionamento para evitar quebras. Adicionar uma tool em MCP é compatível: o cliente antigo continua funcionando e apenas ignora a tool nova, que só passa a ser usada por clientes que a consideram relevante.",
  },
  {
    dimension: "Público-alvo",
    api: "Desenvolvedores humanos",
    mcp: "Modelos de linguagem",
    detail:
      "REST é uma interface de produto pensada para pessoas escreverem código contra ela. MCP é uma interface de contexto pensada para modelos escolherem ferramentas em tempo de execução. A diferença de público explica a maior parte das demais divergências.",
  },
];
