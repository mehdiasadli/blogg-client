import styled from 'styled-components'
import moment from 'moment'
import Title from '../../atoms/Title'
import Text from '../../atoms/Text'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import { useState } from 'react'
import Menu from '../../atoms/Menu'
import Modal from '../../atoms/Modal'
import { useDeleteBlog } from '../../../hooks/useDeleteBlog'
import { useAuth } from '../../../hooks/useAuth'

const Container = styled(motion.div)`
  padding: 1rem;
  min-height: 12rem;
  border-radius: 3px;
  background-color: ${(props) =>
    props.bg
      ? props.bg
      : props.profile === 'true'
      ? props.theme.colors.background.main
      : props.theme.colors.background.light};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;

  transition: all 0.3s ease;
  color: ${(props) => props.theme.colors.text.main};
  box-shadow: ${(props) => props.theme.shadows.low};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.light};
    color: ${(props) => props.theme.colors.text.light};
    box-shadow: ${(props) => props.theme.shadows.mid};
  }
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
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.background.main};
    color: ${(props) => props.theme.colors.text.main};
  }
`
const Icon = styled(MoreHorizRoundedIcon)``

const BlogPost = ({ blog, profile = false, bg }) => {
  const items = [
    { id: 1, label: 'Edit', link: blog._id },
    { id: 2, label: 'Delete' }
  ]

  const navigate = useNavigate()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { mutate } = useDeleteBlog()

  function close() {
    setModalOpen(false)
  }

  const handleOpen = (e) => {
    e.stopPropagation()
    setIsOpen(e.currentTarget)
  }

  const isOwner = blog.author._id === user._id

  return (
    <Container bg={bg} profile={profile ? 'true' : 'false'}>
      <Header onClick={() => navigate(`/user/${blog.author.username}`)}>
        {!profile && <Text>{blog.author.username}</Text>}
        <Text italic>{moment(blog.createdAt).fromNow()}</Text>
      </Header>
      <Main onClick={() => navigate(`/blog/${blog._id}`)}>
        <Title family>
          {blog.title.length > 25 ? `${blog.title.slice(0, 25)}...` : blog.title}
        </Title>
      </Main>
      <Footer onClick={() => navigate(`/collection/${blog.collectionName._id}`)}>
        <Title family as='h4'>
          {blog.collectionName.name}
        </Title>
        {isOwner && (
          <IconContainer onClick={handleOpen}>
            <Icon />
          </IconContainer>
        )}
      </Footer>
      {isOwner && (
        <>
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} items={items} setModalOpen={setModalOpen} />
          <Modal
            confirmLabel='Delete'
            open={modalOpen}
            close={close}
            onConfirm={() => mutate(blog._id)}
          >
            <Title as='h3'>Are you sure to delete?</Title>
          </Modal>
        </>
      )}
    </Container>
  )
}

export default BlogPost
