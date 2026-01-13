import { createSlice } from '@reduxjs/toolkit'

const initialUser = JSON.parse(localStorage.getItem('authUser')) || null
const initialToken = localStorage.getItem('authToken') || null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: initialToken,
    status: 'idle',
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token || 'local-token'
      localStorage.setItem('authUser', JSON.stringify(state.user))
      localStorage.setItem('authToken', state.token)
    },
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('authUser')
      localStorage.removeItem('authToken')
    },
    registerSuccess(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token || 'local-token'
      localStorage.setItem('authUser', JSON.stringify(state.user))
      localStorage.setItem('authToken', state.token)
    },
  },
})

export const { loginSuccess, logout, registerSuccess } = authSlice.actions
export default authSlice.reducer
