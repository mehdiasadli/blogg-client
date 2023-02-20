import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAlert } from '../../../hooks/useAlert'
import { useAuth } from '../../../hooks/useAuth'
import { useFetch } from '../../../hooks/useFetch'
import { getUserByUsername } from '../../../services/user.api'
import FeedSkeleton from '../../atoms/Skeleton/FeedSkeleton'
import Text from '../../atoms/Text'
import Title from '../../atoms/Title'
import Html from '../../components/Html'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'
import CollectionPost from '../Profile/CollectionPost'

const Container = styled.main`
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  background-color: ${(props) => props.theme.colors.background.main};
  color: ${(props) => props.theme.colors.text.main};
  @media (${(props) => props.theme.breakpoints.m}) {
    padding: 1rem 1rem;
  }
`
const Section = styled.div`
  padding: 1rem;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) => props.theme.colors.text.main};
`
const UserSection = styled(Section)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`
const Wrapper = styled(Section)`
  width: 100%;
`
const List = styled.div`
  position: relative;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

const User = () => {
  const navigate = useNavigate()
  const { username } = useParams()
  const { user } = useAuth()
  const { setAlert } = useAlert()
  const [profile, setProfile] = useState(null)

  const { isLoading } = useFetch('user', () => getUserByUsername(username), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: ({ data }) => {
      setProfile(data)
    }
  })

  useEffect(() => {
    if (username === user.username) {
      navigate('/profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Html title={profile?.data?.username} />
      <UserSection>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <Title as='h2' family center>
              {profile.data.firstName} {profile.data.lastName}
            </Title>
            <Text family italic>
              {profile.data.username}
            </Text>
          </>
        )}
      </UserSection>
      <Wrapper>
        <List>
          {isLoading ? (
            <FeedSkeleton />
          ) : (
            profile.data.collections.map((item) => <CollectionPost key={item._id} coll={item} />)
          )}
        </List>
      </Wrapper>
    </Container>
  )
}

export default User
