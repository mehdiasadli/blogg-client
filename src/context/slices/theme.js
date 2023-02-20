import { createSlice } from '@reduxjs/toolkit'
import { themes } from '../../assets/theme'

export const THEMES = Object.keys(themes).reduce((a, c) => {
  a[c] = c
  return a
}, {})

const initialState = {
  theme: THEMES.light
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
