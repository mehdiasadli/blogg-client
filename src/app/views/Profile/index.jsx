import styled from 'styled-components'
import { HR } from '../../../assets'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import Button from '../../atoms/Button'
import Skeleton from '../../atoms/Skeleton'
import Text from '../../atoms/Text'
import Title from '../../atoms/Title'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'
import CollectionList from './CollectionList'
import BlogList from './BlogList'
import { useNavigate } from 'react-router-dom'

const Container = styled.main`
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  background-color: ${(props) => props.theme.colors.background.main};
  color: ${(props) => props.theme.colors.text.main};
  @media (${(props) => props.theme.breakpoints.m}) {
    padding: 1rem 1rem;
    flex-direction: column;
  }
`
const Section = styled.div`
  padding: 1rem;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) => props.theme.colors.text.main};
`
const UserSection = styled(Section)`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`
const UserItem = styled.div`
  width: 100%;
  height: 3rem;
  padding-inline: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.background.main};
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logout = styled(Button)`
  @media (${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`


const Profile = () => {
  const navigate = useNavigate()
  const { user, logOut } = useAuth()
  const { colLoading, collections, blogLoading, blogs, screen, tabs, handleScreen } = useProfile()

  return (
    <Container>
      <UserSection>
        <Title as='h2' family center>
          {user.firstName} {user.lastName}
        </Title>
        <Text family italic>
          {user.username}
        </Text>
        <HR />
        {colLoading ? (
          <Skeleton height='3rem' />
        ) : collections?.all ? (
          <UserItem onClick={() => handleScreen(tabs.coll)}>
            <Text>Collections</Text>
            {collections.all}
          </UserItem>
        ) : (
          <UserItem onClick={() => handleScreen(tabs.coll)}>
            <Text>Collections</Text>0
          </UserItem>
        )}
        {blogLoading ? (
          <Skeleton height='3rem' />
        ) : blogs?.all ? (
          <UserItem onClick={() => handleScreen(tabs.blog)}>
            <Text>Blogs</Text>
            {blogs.all}
          </UserItem>
        ) : (
          <UserItem>
            <Text>Blogs</Text>0
          </UserItem>
        )}
        <UserItem onClick={() => navigate('/settings')}>
          <Text>Settings</Text>
        </UserItem>
        <Logout width={'100%'} onClick={logOut}>
          Logout
        </Logout>
      </UserSection>
      {screen.name === 'coll' ? <CollectionList /> : <BlogList />}
    </Container>
  )
}

export default Profile
