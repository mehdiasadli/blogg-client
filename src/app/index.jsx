import { useColorTheme } from '../hooks/useColorTheme'
import { ThemeProvider } from 'styled-components'

import { theme as THEME, themes, commonColors } from '../assets/theme'
import Router from './router'
import { useAlert } from '../hooks/useAlert'
import Alert from './components/modals/Alert'

const App = () => {
  const { scheme } = useColorTheme()
  const { message, variant } = useAlert()

  const theme = { ...THEME, colors: { ...commonColors, ...themes[scheme] } }

  return (
    <ThemeProvider theme={theme}>
      <Router />
      {message && <Alert alert={message} variant={variant} />}
    </ThemeProvider>
  )
}

export default App
