import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useGetBlog } from '../../../hooks/useGetBlog'
import Title from '../../atoms/Title'
import { count, parse } from '../../../utils/blog'
import Text from '../../atoms/Text'
import moment from 'moment'
import BlogSkeleton from '../../atoms/Skeleton/BlogSkeleton'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'
import { HR } from '../../../assets/'
import Field from '../../atoms/Field'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { makeFilter } from '../../../utils/makeFilter'
import { formats, modules } from '../../../data/quill'
import Button from '../../atoms/Button'
import { useEditBlog } from '../../../hooks/useEditBlog'

const Container = styled.main`
  padding: 1rem 2rem;
  @media (${(props) => props.theme.breakpoints.m}) {
    padding: 1rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  background-color: ${(props) => props.theme.colors.background.main};
  color: ${(props) => props.theme.colors.text.main};
`

const Article = styled.article`
  text-align: justify;

  font-family: 'Playfair Display', serif !important;

  &::first-letter {
    font-size: 2rem;
  }
  & p,
  & strong,
  & em,
  & span,
  & blockquote,
  & u {
    font-family: 'Playfair Display', serif !important;
  }
`

const Bold = styled.strong`
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.background.dark};
  }
`
const Wrapper = styled(ReactQuill)`
  box-shadow: ${(props) => props.shadows.low};

  padding: 0;
  & .ql-toolbar {
    border: none !important;
    border-radius: 3px 3px 0 0;
    background-color: ${(props) => props.colors.background.dark};
  }

  & .ql-toolbar span {
    color: ${(props) => props.colors.text.main};
  }
  & .ql-toolbar .ql-stroke {
    ${(props) => props.result};
  }
  & .ql-container {
    border-radius: 0 0 3px 3px;
    border: none !important;
    background-color: ${(props) => props.colors.background.light};
  }
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`

const Blog = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { blog, isLoading } = useGetBlog(id)
  const { colors, shadows } = useTheme()
  const { mutate } = useEditBlog(leaveEditMode)

  useEffect(() => {
    if (blog) {
      setEditMode({
        title: blog.title,
        content: blog.content
      })
    }
  }, [blog])

  const [editMode, setEditMode] = useState({
    title: '',
    content: ''
  })

  const handleChange = (value, name) => {
    setEditMode((prev) => ({ ...prev, [name]: value }))
  }

  function leaveEditMode () {
    navigate(location.pathname, {})
  }

  useEffect(() => {
    if (location.state?.msg) {
      navigate(location.pathname, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  return isLoading ? (
    <BlogSkeleton />
  ) : (
    <Container>
      {location?.state?.editMode ? (
        <Field
          value={editMode.title}
          onChange={(val) => setEditMode((prev) => ({ ...prev, title: val }))}
          placeholder={'NAME'}
        />
      ) : (
        <Title family>{blog.title}</Title>
      )}
      <Text family>
        Written by:{' '}
        <Bold onClick={() => navigate(`/user/${blog.author.username}`)}>
          {blog.author.firstName} {blog.author.lastName}
        </Bold>
      </Text>
      <Text family>
        Collection:{' '}
        <Bold onClick={() => navigate(`/collection/${blog.collectionName._id}`)}>
          {blog.collectionName.name}
        </Bold>
      </Text>
      <HR />
      {!location?.state?.editMode ? (
        <Article dangerouslySetInnerHTML={{ __html: parse(blog.content) }}></Article>
      ) : (
        <Wrapper
          colors={colors}
          shadows={shadows}
          result={makeFilter(colors.text.main)}
          theme='snow'
          value={editMode.content}
          onChange={(v) => handleChange(v, 'content')}
          modules={modules}
          formats={formats}
        />
      )}
      {!location?.state?.editMode && (
        <>
          <HR />
          <Text family>
            <Bold>{moment(blog.createdAt).format('MMMM Do YYYY')}</Bold>
          </Text>
          <Text family>
            <Bold>{count(parse(blog.content))} Words</Bold>
          </Text>
        </>
      )}
      {location?.state?.editMode && (
        <Buttons>
          <Button width={'50%'} onClick={leaveEditMode}>
            Cancel
          </Button>
          <Button width={'50%'} onClick={() => mutate({ id: blog._id, data: editMode })}>
            Save
          </Button>
        </Buttons>
      )}
    </Container>
  )
}

export default Blog
