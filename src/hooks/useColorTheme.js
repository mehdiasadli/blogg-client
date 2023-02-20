import { useDispatch, useSelector } from 'react-redux'
import { setTheme, THEMES } from '../context/slices/theme'

export const useColorTheme = () => {
  const dispatch = useDispatch()
  const scheme = useSelector((state) => state.theme.theme)

  const setScheme = (theme) => {
    dispatch(setTheme(theme))
  }

  return { dispatch, scheme, schemes: THEMES, setScheme }
}
