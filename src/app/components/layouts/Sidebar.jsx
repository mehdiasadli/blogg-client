import { Drawer, MenuItem } from '@mui/material'
import styled from 'styled-components'
import Button from '../../atoms/Button'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Text from '../../atoms/Text'

const Container = styled.aside`
  width: 60vw;
  height: 100vh;
  padding-block: 2rem;

  color: ${(props) => props.theme.colors.text.main};
  background-color: ${(props) => props.theme.colors.background.main};

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Sidebar = ({ open, close, items }) => {
  const navigate = useNavigate()
  const { logOut } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleClick = (item) => {
    if (!item.action) {
      close()
      return
    }
    if (item.label === 'Logout') {
      item.action(logOut)
    } else {
      item.action(navigate)
    }
    close()
  }

  return (
    <Drawer anchor={'right'} open={open} onClose={close}>
      <Container>
        {pathname !== '/write' && (
          <Button
            width='100%'
            height='3rem'
            radius='0'
            icon={<DriveFileRenameOutlineRoundedIcon />}
            onClick={() => navigate('/write')}
          >
            Write
          </Button>
        )}
        {items.map((item) => (
          <MenuItem key={item.id} tabIndex={item.id} onClick={() => handleClick(item)}>
            <Text>{item.label}</Text>
          </MenuItem>
        ))}
      </Container>
    </Drawer>
  )
}

export default Sidebar
