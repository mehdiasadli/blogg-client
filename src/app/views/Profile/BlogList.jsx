import { useState } from 'react'
import styled from 'styled-components'
import { useGetUsersBlogs } from '../../../hooks/useGetUsersBlogs'
import Pagination from '../../atoms/Pagination'
import FeedSkeleton from '../../atoms/Skeleton/FeedSkeleton'
import Title from '../../atoms/Title'
import BlogPost from '../Feed/BlogPost'
import ProfileList from './ProfileList'

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const List = styled.div`
  position: relative;
  padding-top: 1rem;
  padding-bottom: 3rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  @media (${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const BlogList = () => {
  const [page, setPage] = useState(1)
  const { blogs, isLoading } = useGetUsersBlogs(page)
  const handlePaginate = (_, value) => {
    setPage(value)
  }

  return (
    <ProfileList>
      <Header>
        <Title family>Blogs</Title>
      </Header>
      <List>
        {isLoading ? (
          <FeedSkeleton profile />
        ) : (
          blogs.data.map((item) => <BlogPost key={item._id} blog={item} profile />)
        )}
      </List>
      <PaginationContainer>
        <Pagination total={blogs.total} page={page} handlePaginate={handlePaginate} />
      </PaginationContainer>
    </ProfileList>
  )
}

export default BlogList
