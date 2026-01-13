import api, { plain } from './api'
import { getToken, getRefreshToken } from './tokenService'

const normalize = (data) => {
  // Handle different backend shapes, e.g. { success, response: { token, refreshToken, user } }
  const out = { user: null, token: null, refreshToken: null }
  if (!data) return out
  if (data.response) {
    const r = data.response
    out.user = r.user || r.data || null
    out.token = r.token || r.accessToken || null
    out.refreshToken = r.refreshToken || r.refreshTokenId || null
    return out
  }
  // fallback to top-level fields
  out.user = data.user || null
  out.token = data.token || data.accessToken || null
  out.refreshToken = data.refreshToken || null
  return out
}

const authService = {
  login: async (credentials) => {
    // backend expects /api/Auth/login
    const res = await api.post('/api/Auth/login', credentials)
    return normalize(res.data)
  },
  register: async (payload) => {
    const res = await api.post('/api/Auth/register', payload)
    return normalize(res.data)
  },
  refresh: async () => {
    // backend expects POST /api/Auth/refresh-token with { token, refreshToken }
    const res = await plain.post('/api/Auth/refresh-token', {
      token: getToken(),
      refreshToken: getRefreshToken(),
      authType: 0,
    })
    return normalize(res.data)
  },
  logout: async () => {
    await api.post('/api/Auth/logout')
  },
}

export default authService
