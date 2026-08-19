import { createSlice } from '@reduxjs/toolkit'

export const AUTH_STORAGE_KEY = 'spotify-auth-user'

const loadUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY))
    if (stored && stored.name && stored.email) return stored
  } catch {
    // corrupted / empty storage — start signed out
  }
  return null
}

const initialState = {
  user: loadUser(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer