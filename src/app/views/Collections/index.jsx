import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useCollectionBlogs } from '../../../hooks/useCollectionBlogs'
import Pagination from '../../atoms/Pagination'
import Skeleton from '../../atoms/Skeleton'
import FeedSkeleton from '../../atoms/Skeleton/FeedSkeleton'
import Text from '../../atoms/Text'
import Title from '../../atoms/Title'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'
import BlogPost from '../Feed/BlogPost'

const Container = styled.div`
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  position: relative;
  background-color: ${(props) => props.theme.colors.background.main};
  padding: 1.5rem;
  padding-bottom: 4rem;
  color: ${(props) => props.theme.colors.text.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`
const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
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

const Collections = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const { colors } = useTheme()

  const { blogs, isLoading } = useCollectionBlogs(page, id)
  console.log(blogs)

  const handlePaginate = (_, value) => {
    setPage(value)
  }

  return (
    <Container>
      {isLoading ? (
        <Skeleton height='2rem' width='10rem' type='text' />
      ) : (
        <Title family>
          {blogs.data.length
            ? `Collection ${blogs.collection.name} by ${blogs.data[0].author.username}`
            : `Collection ${blogs.collection.name}`}
        </Title>
      )}
      <Wrapper>
        {isLoading ? (
          <FeedSkeleton />
        ) : blogs?.data.length ? (
          blogs.data.map((blog) => (
            <BlogPost key={blog._id} blog={blog} profile bg={colors.background.light} />
          ))
        ) : (
          <Text color={colors.text.main}>No blog</Text>
        )}
        <PaginationContainer>
          <Pagination total={blogs.total} page={page} handlePaginate={handlePaginate} />
        </PaginationContainer>
      </Wrapper>
    </Container>
  )
}

export default Collections
