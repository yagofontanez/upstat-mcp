# upstat-mcp

**MCP (Model Context Protocol) server** for [UpStat](https://upstat.online) —
manage your uptime monitoring directly from Claude Desktop (or any
MCP-compatible client).

With this server installed, you can talk to your UpStat account in natural
language: list monitors, create new ones, trigger pings, inspect incidents,
and pull uptime history — without ever opening the dashboard.

## Installation

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "upstat": {
      "command": "npx",
      "args": ["-y", "upstat-mcp"],
      "env": {
        "UPSTAT_API_KEY": "your-api-key"
      }
    }
  }
}
```

Generate an API key at [upstat.online](https://upstat.online) → Integrations → API Keys.

## Available tools

| Tool                 | Description                          |
| -------------------- | ------------------------------------ |
| `get_monitors`       | List all monitors                    |
| `get_monitor`        | Get details for a single monitor     |
| `create_monitor`     | Create a new monitor                 |
| `update_monitor`     | Update an existing monitor           |
| `delete_monitor`     | Delete a monitor                     |
| `toggle_monitor`     | Pause or resume a monitor            |
| `ping_now`           | Trigger an immediate ping            |
| `get_pings`          | Fetch ping history                   |
| `get_incidents`      | List incidents                       |
| `get_uptime_history` | Get daily uptime history             |

## Example prompts

> "Which monitors do I have on UpStat?"

> "Create a monitor for https://mysite.com"

> "Has my API had any incidents recently?"

> "Pause the frontend monitor"

> "Ping the production monitor right now"

## License

MIT
