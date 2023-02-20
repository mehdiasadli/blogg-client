import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true
      state.isLoading = true
      state.error = null
    },
    loginFailure: (state, action) => {
      state.user = null
      state.isLoggedIn = false
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.isLoading = false
      state.error = null
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer
