import styled from 'styled-components'
import Skeleton from '../../atoms/Skeleton'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'

const Container = styled.main`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  background-color: ${(props) => props.theme.colors.background.main};
  color: ${(props) => props.theme.colors.text.main};
`

const HR = styled.hr`
  margin-block: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.background.main};
`

const BlogSkeleton = () => {
  return (
    <Container>
      <Skeleton height='3.5rem' width='20rem' variant='text' />
      <Skeleton variant='text' width='18rem' />
      <Skeleton variant='text' width='18rem' />
      <HR />
      <Skeleton height='10rem' />
      <HR />
      <Skeleton variant='text' width='15rem' />
      <Skeleton variant='text' width='15rem' />
    </Container>
  )
}

export default BlogSkeleton
