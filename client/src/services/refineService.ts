import { API_BASE } from '../lib/api'
import { requestJson } from '../lib/http'
import type { RefinePayload } from '../types'

export class RefineService {
  private static baseUrl = `${API_BASE}/api/refine`

  static async refine(payload: RefinePayload): Promise<string> {
    const data = await requestJson<{ refined: string }>(this.baseUrl, { method: 'POST', body: payload })
    return data.refined
  }
}
