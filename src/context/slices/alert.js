import { createSlice } from '@reduxjs/toolkit'

const DEFAULT = {
  variant: 'error',
  timeout: 5000
}

const initialState = {
  msg: '',
  variant: ''
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.msg = ''
      state.variant = ''
    },
    createAlert: (state, action) => {
      let message = action.payload.msg
      if (typeof message !== 'string') {
        message =
          message?.response?.data?.message ||
          message?.response?.data?.msg ||
          'Something went wrong. Please try again.'
      }
      state.msg = message
      state.variant = action.payload?.variant || DEFAULT.variant
    }
  }
})

export const { clearAlert, createAlert } = alertSlice.actions

export default alertSlice.reducer
