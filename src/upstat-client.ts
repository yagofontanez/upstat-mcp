const BASE_URL = "https://api.upstat.online/api";

export class UpstatClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(path: string, options: RequestInit = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`UpStat API error ${res.status}: ${error}`);
    }

    return res.json();
  }

  async getMonitors() {
    return this.request("/v1/monitors");
  }

  async getMonitor(id: string) {
    return this.request(`/v1/monitors/${id}`);
  }

  async createMonitor(data: {
    name: string;
    url: string;
    keyword?: string;
    monitor_type?: "http" | "tcp";
    tcp_port?: number;
    sla_target?: number;
    http_method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
    request_body?: string;
    request_headers?: Record<string, string>;
  }) {
    return this.request("/v1/monitors", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateMonitor(
    id: string,
    data: Partial<{
      name: string;
      url: string;
      keyword: string;
      monitor_type: "http" | "tcp";
      tcp_port: number;
      sla_target: number;
      http_method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
      request_body: string;
      request_headers: Record<string, string>;
    }>,
  ) {
    return this.request(`/v1/monitors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteMonitor(id: string) {
    return this.request(`/v1/monitors/${id}`, { method: "DELETE" });
  }

  async toggleMonitor(id: string) {
    return this.request(`/v1/monitors/${id}/toggle`, { method: "PATCH" });
  }

  async pingNow(id: string) {
    return this.request(`/v1/monitors/${id}/ping`, { method: "POST" });
  }

  async getMonitorPings(id: string) {
    return this.request(`/v1/monitors/${id}/pings`);
  }

  async getIncidents(id: string) {
    return this.request(`/v1/monitors/${id}/incidents`);
  }

  async getUptimeHistory(id: string) {
    return this.request(`/v1/monitors/${id}/uptime-history`);
  }
}
