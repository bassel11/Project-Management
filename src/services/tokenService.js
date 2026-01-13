let _token = null
let _refreshToken = null

export const setToken = (token) => {
  _token = token
}

export const setRefreshToken = (refreshToken) => {
  _refreshToken = refreshToken
}

export const getToken = () => _token
export const getRefreshToken = () => _refreshToken

export const clearToken = () => {
  _token = null
}
export const clearRefreshToken = () => {
  _refreshToken = null
} 
