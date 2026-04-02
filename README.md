# upstat-mcp

Servidor MCP para o [UpStat](https://upstat.online) — monitore seu uptime direto pelo Claude Desktop.

## Instalação

Adicione no seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "upstat": {
      "command": "npx",
      "args": ["-y", "upstat-mcp"],
      "env": {
        "UPSTAT_API_KEY": "sua-api-key"
      }
    }
  }
}
```

Gere sua API key em [upstat.online](https://upstat.online) → Integrações → API Keys.

## Ferramentas disponíveis

| Ferramenta           | Descrição                  |
| -------------------- | -------------------------- |
| `get_monitors`       | Lista todos os monitores   |
| `get_monitor`        | Detalhes de um monitor     |
| `create_monitor`     | Cria um novo monitor       |
| `update_monitor`     | Atualiza um monitor        |
| `delete_monitor`     | Remove um monitor          |
| `toggle_monitor`     | Pausa ou ativa um monitor  |
| `ping_now`           | Força um ping imediato     |
| `get_pings`          | Histórico de pings         |
| `get_incidents`      | Lista incidentes           |
| `get_uptime_history` | Histórico de uptime diário |

## Exemplos de uso

> "Quais monitores eu tenho no UpStat?"

> "Cria um monitor para https://meusite.com.br"

> "Minha API teve algum incidente recentemente?"

> "Pausa o monitor do frontend"

> "Faz um ping agora no monitor de produção"

## Licença

MIT
