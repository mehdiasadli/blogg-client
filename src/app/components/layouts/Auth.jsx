import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background.main};

  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 40%;
  @media (${(props) => props.theme.breakpoints.lg}) {
    width: 65%;
  }
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 75%;
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    width: 85%;
  }
  @media (${(props) => props.theme.breakpoints.xsm}) {
    width: 95%;
  }
`

const Auth = () => {
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  )
}

export default Auth
