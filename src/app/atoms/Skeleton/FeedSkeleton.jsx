import styled from 'styled-components'
import Skeleton from '../../atoms/Skeleton'

const SContainer = styled.div`
  padding: 1rem;
  border-radius: 3px;
  background-color: ${(props) =>
    props.profile === 'true'
      ? props.theme.colors.background.main
      : props.theme.colors.background.light};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FeedSkeleton = ({ profile = false }) => {
  const skeletons = Array.from({ length: 12 })
  return skeletons.map((_, i) => (
    <SContainer key={i} profile={profile ? 'true' : 'false'}>
      <Header>
        <Skeleton variant='text' width='5rem' />
        <Skeleton variant='text' width='8rem' />
      </Header>
      <Main>
        <Skeleton variant='text' height='4rem' width='14rem' />
      </Main>
      <Footer>
        <Skeleton variant='text' width='6rem' />
      </Footer>
    </SContainer>
  ))
}

export default FeedSkeleton
