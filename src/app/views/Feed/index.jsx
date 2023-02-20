import styled, { useTheme } from 'styled-components'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'
import { useFetch } from '../../../hooks/useFetch'
import { getAllBlogs } from '../../../services/blog.api'
import { useEffect, useState } from 'react'
import Pagination from '../../atoms/Pagination'
import BlogPost from './BlogPost'
import FeedSkeleton from '../../atoms/Skeleton/FeedSkeleton'
import Text from '../../atoms/Text'

const Container = styled.div`
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  position: relative;
  background-color: ${(props) => props.theme.colors.background.main};
  padding: 1.5rem;
  padding-bottom: 4rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  @media (${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-template-rows: repeat(3, 1fr);
`
const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Feed = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const { colors } = useTheme()

  const { isLoading, refetch } = useFetch('blogs', () => getAllBlogs(page), {
    onSuccess: ({ data }) => setBlogs(data),
    onError: (err) => console.error(err)
  })

  const handlePaginate = (_, value) => {
    setPage(value)
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <Container>
      {isLoading ? (
        <FeedSkeleton />
      ) : (
        (blogs?.data.length &&
          blogs.data.map((blog) => <BlogPost key={blog._id} blog={blog} />)) || (
          <Text color={colors.text.main}>No Blog</Text>
        )
      )}
      <PaginationContainer>
        <Pagination total={blogs.total} page={page} handlePaginate={handlePaginate} />
      </PaginationContainer>
    </Container>
  )
}

export default Feed
