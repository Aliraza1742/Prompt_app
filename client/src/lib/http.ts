export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type JsonRequestOptions = Omit<RequestInit, 'method' | 'body'> & {
  method?: HttpMethod
  body?: unknown
}

async function readJsonSafely(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return response.json()
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function extractErrorMessage(payload: unknown): string | null {
  if (!payload) return null
  if (typeof payload === 'string') return payload
  if (typeof payload === 'object') {
    const anyPayload = payload as Record<string, unknown>
    if (typeof anyPayload.error === 'string' && anyPayload.error.length > 0) {
      const details = typeof anyPayload.details === 'string' ? anyPayload.details : null
      return details ? `${anyPayload.error}: ${details}` : anyPayload.error
    }
    if (typeof anyPayload.message === 'string' && anyPayload.message.length > 0) return anyPayload.message
  }
  return null
}

export async function requestJson<T>(url: string, options: JsonRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers, ...rest } = options

  const response = await fetch(url, {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : null),
      ...(headers || {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const payload = await readJsonSafely(response)
  if (!response.ok) {
    const message = extractErrorMessage(payload) || `Request failed (${response.status})`
    throw new Error(message)
  }
  return payload as T
}

