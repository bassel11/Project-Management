import api from './api'

const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials)
    return res.data
  },
  register: async (payload) => {
    const res = await api.post('/auth/register', payload)
    return res.data
  },
  refresh: async () => {
    // relies on httpOnly refresh cookie; server should respond { user, token }
    const res = await api.get('/auth/refresh')
    return res.data
  },
  logout: async () => {
    await api.post('/auth/logout')
  },
}

export default authService
