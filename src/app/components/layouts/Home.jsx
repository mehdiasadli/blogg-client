import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar, { NAV_HEIGHT } from './Navbar'

const Container = styled.main``
const Wrapper = styled.div`
  margin-top: ${NAV_HEIGHT}rem;
`

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  )
}

export default Home
