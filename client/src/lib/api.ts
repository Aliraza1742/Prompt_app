const OVERRIDE = typeof window !== 'undefined' ? localStorage.getItem('api_base_override') : null
export const API_BASE = (OVERRIDE && OVERRIDE.length > 0) ? OVERRIDE : (import.meta.env.VITE_API_BASE || 'http://localhost:4000')
