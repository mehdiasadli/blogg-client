import { useTheme } from 'styled-components'
import { Pagination as MuiPagination } from '@mui/material'

const Pagination = ({ total, page, handlePaginate }) => {
  const { colors } = useTheme()

  return (
    total > 1 && (
      <MuiPagination
        count={total || 0}
        page={page}
        onChange={handlePaginate}
        variant='outlined'
        sx={{
          '& button': {
            backgroundColor: colors.background.main,
            color: colors.text.main,
            borderColor: colors.background.dark
          }
        }}
      />
    )
  )
}

export default Pagination
