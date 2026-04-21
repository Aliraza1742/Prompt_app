import { API_BASE } from '../lib/api'
import { requestJson } from '../lib/http'
import type { Prompt, PromptPayload } from '../types'

export class PromptService {
  private static baseUrl = `${API_BASE}/api/prompts`

  static async getAll(): Promise<Prompt[]> {
    const data = await requestJson<{ prompts?: Prompt[] }>(this.baseUrl)
    return data.prompts || []
  }

  static async create(payload: PromptPayload): Promise<Prompt> {
    const data = await requestJson<{ prompt: Prompt }>(this.baseUrl, { method: 'POST', body: payload })
    return data.prompt
  }

  static async update(id: string, payload: PromptPayload): Promise<Prompt> {
    const data = await requestJson<{ prompt: Prompt }>(`${this.baseUrl}/${id}`, { method: 'PUT', body: payload })
    return data.prompt
  }

  static async delete(id: string): Promise<void> {
    await requestJson<unknown>(`${this.baseUrl}/${id}`, { method: 'DELETE' })
  }
}
