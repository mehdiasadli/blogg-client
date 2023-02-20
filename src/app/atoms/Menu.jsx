import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/useAuth'
import { useDeleteBlog } from '../../hooks/useDeleteBlog'
import Text from './Text'

const Menu = ({ isOpen, setIsOpen, items, setModalOpen }) => {
  const open = Boolean(isOpen)

  const navigate = useNavigate()
  const { logOut } = useAuth()
  const { colors } = useTheme()

  const handleClose = (item) => {
    if (!item.action && !item.label) {
      setIsOpen(null)
      return
    }

    switch (item.label) {
      case 'Logout':
        item.action(logOut)
        break
      case 'Edit':
        navigate(`/blog/${item.link}`, { state: { editMode: true } })
        break
      case 'Delete':
        setModalOpen(true)
        break
      default:
        item.action(navigate)
        break
    }

    setIsOpen(null)
  }

  return (
    <MuiMenu
      anchorEl={isOpen}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      sx={{
        '& ul': {
          padding: 0
        },
        marginTop: '0.75rem'
      }}
    >
      {items.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => handleClose(item)}
          sx={{
            height: '2.5rem',
            width: '12rem',
            backgroundColor: colors.background.main,
            transition: 'all .2s ease-in-out',
            color: colors.text.main,
            '&:hover': { backgroundColor: colors.background.light },
            '&:focus': { backgroundColor: colors.primary.main, color: colors.text.light }
          }}
        >
          <Text>{item.label}</Text>
        </MenuItem>
      ))}
    </MuiMenu>
  )
}

export default Menu
