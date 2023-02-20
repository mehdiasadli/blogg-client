import styled from 'styled-components'
import Button from '../../atoms/Button'
// import Field from '../../atoms/Field'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Menu from '../../atoms/Menu'

const menu = [
  { id: 1, label: 'Profile', action: (nav) => nav('/profile') },
  { id: 2, label: 'Settings', action: (nav) => nav('/settings') },
  { id: 3, label: 'Logout', action: (logout) => logout() }
]

export const NAV_HEIGHT = 3
const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 10;

  width: 100vw;
  height: ${NAV_HEIGHT}rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-inline: 3rem;

  background-color: ${(props) => props.theme.colors.background.light};
  box-shadow: ${(props) => props.theme.shadows.low};
`
const Logo = styled.h2`
  flex: 1;
  user-select: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.main};
`
// const SearchBar = styled.div`
//   flex: 1;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   @media (${(props) => props.theme.breakpoints.m}) {
//     display: none;
//   }
// `
const UserSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  @media (${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`
const Username = styled.p`
  padding: 0.2rem;
  border-radius: 3px;

  color: ${(props) => props.theme.colors.text.main};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.background.main};
  }
`
const MenuButton = styled.div`
  display: none;
  @media (${(props) => props.theme.breakpoints.m}) {
    display: flex;
  }
  height: 80%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${(props) => props.theme.colors.text.main};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.background.dark};
  }
`

const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAuth()

  const [isSideOpen, setIsSideOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(null)

  const handleWrite = () => {
    navigate('/write')
  }

  const handleUserClick = (e) => {
    setIsMenuOpen(e.currentTarget)
  }

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>BLOGG.</Logo>
      {/* <SearchBar>
        <Field height='2rem' width='25rem' placeholder='Search' icon={<SearchRoundedIcon />} />
      </SearchBar> */}
      <UserSection>
        {pathname !== '/write' && (
          <Button
            onClick={handleWrite}
            width='8rem'
            height='2rem'
            icon={<DriveFileRenameOutlineRoundedIcon />}
          >
            Write
          </Button>
        )}
        {pathname !== '/profile' && (
          <Username onClick={handleUserClick}>
            {user.firstName} {user.lastName}
          </Username>
        )}
      </UserSection>
      <MenuButton>
        <MenuRoundedIcon onClick={() => setIsSideOpen(true)} />
      </MenuButton>
      <Sidebar open={isSideOpen} close={() => setIsSideOpen(false)} items={menu} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} items={menu} />
    </Container>
  )
}

export default Navbar
