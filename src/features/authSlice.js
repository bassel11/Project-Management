import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

// Try to initialize user from localStorage (only user info, not recommended for tokens)
const initialUser = JSON.parse(localStorage.getItem('authUser')) || null
const initialToken = null // don't persist token in localStorage for security

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authService.login(credentials)
    // expected response: { user, token } where token is access token
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const data = await authService.register(payload)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const refreshAuth = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const data = await authService.refresh()
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: initialToken,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('authUser')
      import('../services/tokenService').then((m) => {
        m.clearToken()
        m.clearRefreshToken()
      }).catch(() => {})
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = Boolean(action.payload.token || action.payload.user)
        if (action.payload.user) localStorage.setItem('authUser', JSON.stringify(action.payload.user))
        // update token service (async import to avoid circular deps)
        if (action.payload.token) {
          import('../services/tokenService').then((m) => {
            m.setToken(action.payload.token)
            if (action.payload.refreshToken) m.setRefreshToken(action.payload.refreshToken)
          }).catch(() => {})
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })

      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = Boolean(action.payload.token || action.payload.user)
        if (action.payload.user) localStorage.setItem('authUser', JSON.stringify(action.payload.user))
        // update token service (async import to avoid circular deps)
        if (action.payload.token) {
          import('../services/tokenService').then((m) => {
            m.setToken(action.payload.token)
            if (action.payload.refreshToken) m.setRefreshToken(action.payload.refreshToken)
          }).catch(() => {})
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })

      .addCase(refreshAuth.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = Boolean(action.payload.token || action.payload.user)
        if (action.payload.user) localStorage.setItem('authUser', JSON.stringify(action.payload.user))
        // update token service if token present (async import to avoid circular deps)
        if (action.payload.token) {
          import('../services/tokenService').then((m) => {
            m.setToken(action.payload.token)
            if (action.payload.refreshToken) m.setRefreshToken(action.payload.refreshToken)
          }).catch(() => {})
        }
      })
      .addCase(refreshAuth.rejected, (state) => {
        state.status = 'idle'
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem('authUser')
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
