import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { UpstatClient } from "./upstat-client.js";
import { z } from "zod";

const apiKey = process.env.UPSTAT_API_KEY;

if (!apiKey) {
  console.error("Error: UPSTAT_API_KEY env variable is required");
  process.exit(1);
}

const client = new UpstatClient(apiKey);

const server = new McpServer({
  name: "upstat-mcp",
  version: "1.0.0",
});

server.registerTool(
  "get_monitors",
  { description: "Lista todos os monitores do UpStat" },
  async () => {
    const result = await client.getMonitors();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "get_monitor",
  {
    description: "Retorna detalhes de um monitor específico",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    const result = await client.getMonitor(id);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "create_monitor",
  {
    description: "Cria um novo monitor de uptime no UpStat",
    inputSchema: {
      name: z.string().describe("Nome do monitor"),
      url: z.string().url().describe("URL a ser monitorada"),
      keyword: z
        .string()
        .optional()
        .describe("Keyword para verificar no corpo da resposta"),
      monitor_type: z
        .enum(["http", "tcp"])
        .optional()
        .describe("Tipo do monitor (padrão: http)"),
      tcp_port: z
        .number()
        .int()
        .min(1)
        .max(65535)
        .optional()
        .describe("Porta TCP"),
      sla_target: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("Meta de SLA em %"),
      http_method: z
        .enum(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"])
        .optional()
        .describe("Método HTTP"),
      request_body: z.string().optional().describe("Body da requisição"),
      request_headers: z
        .record(z.string(), z.string())
        .optional()
        .describe("Headers customizados"),
    },
  },
  async (args) => {
    const result = await client.createMonitor(args);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "update_monitor",
  {
    description: "Atualiza um monitor existente",
    inputSchema: {
      id: z.string().describe("ID do monitor"),
      name: z.string().optional().describe("Nome do monitor"),
      url: z.string().url().optional().describe("URL a ser monitorada"),
      keyword: z
        .string()
        .optional()
        .describe("Keyword para verificar no corpo da resposta"),
      monitor_type: z
        .enum(["http", "tcp"])
        .optional()
        .describe("Tipo do monitor"),
      tcp_port: z
        .number()
        .int()
        .min(1)
        .max(65535)
        .optional()
        .describe("Porta TCP"),
      sla_target: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("Meta de SLA em %"),
      http_method: z
        .enum(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"])
        .optional()
        .describe("Método HTTP"),
      request_body: z.string().optional().describe("Body da requisição"),
      request_headers: z
        .record(z.string(), z.string())
        .optional()
        .describe("Headers customizados"),
    },
  },
  async ({ id, ...data }) => {
    const result = await client.updateMonitor(id, data);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "delete_monitor",
  {
    description: "Remove um monitor",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    await client.deleteMonitor(id);
    return {
      content: [{ type: "text", text: "Monitor deletado com sucesso." }],
    };
  },
);

server.registerTool(
  "toggle_monitor",
  {
    description: "Ativa ou pausa um monitor",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    const result = await client.toggleMonitor(id);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "ping_now",
  {
    description: "Força um ping imediato no monitor",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    const result = await client.pingNow(id);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "get_pings",
  {
    description: "Retorna histórico de pings de um monitor",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    const result = await client.getMonitorPings(id);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "get_incidents",
  {
    description: "Lista incidentes de um monitor",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    const result = await client.getIncidents(id);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "get_uptime_history",
  {
    description: "Retorna histórico de uptime diário de um monitor",
    inputSchema: { id: z.string().describe("ID do monitor") },
  },
  async ({ id }) => {
    const result = await client.getUptimeHistory(id);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
