import styled from 'styled-components'
import moment from 'moment'
import Title from '../../atoms/Title'
import Text from '../../atoms/Text'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { ROLE } from '../../../data'
import { useState } from 'react'
import Menu from '../../atoms/Menu'
import Modal from '../../atoms/Modal'
import { useDeleteCollection } from '../../../hooks/useDeleteCollection'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'

const Container = styled(motion.div)`
  padding: 1rem;
  min-height: 12rem;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.background.main};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;

  transition: all 0.3s ease;
  color: ${(props) => props.theme.colors.text.main};
  box-shadow: ${(props) => props.theme.shadows.low};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.main};
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

const CollectionPost = ({ coll }) => {
  const items = [{ id: 1, label: 'Delete' }]

  const navigate = useNavigate()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { mutate } = useDeleteCollection()

  function close() {
    setModalOpen(false)
  }

  const handleOpen = (e) => {
    e.stopPropagation()
    setIsOpen(e.currentTarget)
  }

  const isOwner = coll.owner._id === user._id || user.role.includes(ROLE.ADMIN)

  return (
    <Container>
      <Header>
        <Text italic>{moment(coll.createdAt).fromNow()}</Text>
      </Header>
      <Main onClick={() => navigate(`/collection/${coll._id}`)}>
        <Title family>{coll.name}</Title>
      </Main>
      <Footer>
        <Title family as='h4'>
          Blogs: {coll.blogs.length}
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
            onConfirm={() => mutate(coll._id)}
          >
            <Title as='h3'>Are you sure to delete?</Title>
          </Modal>
        </>
      )}
    </Container>
  )
}

export default CollectionPost
