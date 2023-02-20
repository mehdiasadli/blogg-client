import styled from 'styled-components'
import moment from 'moment'
import Title from '../../atoms/Title'
import Text from '../../atoms/Text'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

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

const CollectionPost = ({ coll }) => {
  const navigate = useNavigate()

  return (
    <Container onClick={() => navigate(`/collection/${coll._id}`)}>
      <Header>
        <Text italic>{moment(coll.createdAt).fromNow()}</Text>
      </Header>
      <Main>
        <Title family>{coll.name}</Title>
      </Main>
      <Footer>
        <Title family as='h4'>
          Blogs: {coll.blogs.length}
        </Title>
      </Footer>
    </Container>
  )
}

export default CollectionPost
