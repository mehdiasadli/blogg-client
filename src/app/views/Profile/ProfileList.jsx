import styled from 'styled-components'

const Section = styled.div`
  padding: 1rem;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) => props.theme.colors.text.main};
`
const Wrapper = styled(Section)`
  position: relative;
  width: 70%;
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const ProfileList = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default ProfileList
