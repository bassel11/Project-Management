import axios from 'axios'
import { getToken, setToken, clearToken, getRefreshToken, setRefreshToken, clearRefreshToken } from './tokenService'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5281'

const api = axios.create({
  baseURL,
  withCredentials: true, // send cookies (for httpOnly refresh tokens)
  headers: {
    'Content-Type': 'application/json',
  },
})

// plain axios instance that does NOT use interceptors (for refresh requests)
export const plain = axios.create({ baseURL, withCredentials: true })

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// attach access token from tokenService to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = getToken()
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => Promise.reject(error)
)

// response interceptor to handle 401 and attempt refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((e) => Promise.reject(e))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // call refresh endpoint using plain axios instance to avoid interceptor loop
        // don't attempt refresh if we don't have a refresh token
        if (!getRefreshToken()) throw new Error('No refresh token available')

        const r = await plain.post('/api/Auth/refresh-token', {
          token: getToken(),
          refreshToken: getRefreshToken(),
          authType: 0,
        })
        const data = r.data
        // data is expected to contain { token, refreshToken }
        if (data?.token) {
          setToken(data.token)
          if (data?.refreshToken) setRefreshToken(data.refreshToken)
          processQueue(null, data.token)
          originalRequest.headers.Authorization = `Bearer ${data.token}`
          return api(originalRequest)
        }
        throw new Error('No token in refresh response')
      } catch (refreshError) {
        processQueue(refreshError, null)
        clearToken()
        clearRefreshToken()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)

export default api
