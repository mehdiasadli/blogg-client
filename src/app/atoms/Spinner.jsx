import { CircularProgress } from '@mui/material'
import { useTheme } from 'styled-components'

const Spinner = ({ color, size = 23 }) => {
  const theme = useTheme()

  return <CircularProgress sx={{ color: color || theme.colors.primary.main }} size={size} />
}

export default Spinner
