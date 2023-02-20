import styled from 'styled-components'
import { themes } from '../../../assets/theme'
import { useColorTheme } from '../../../hooks/useColorTheme'
import Select from '../../atoms/Select'
import Text from '../../atoms/Text'
import Html from '../../components/Html'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'

const Container = styled.div`
  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  position: relative;
  background-color: ${(props) => props.theme.colors.background.main};
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding-inline: 1rem;
  }
  @media (${(props) => props.theme.breakpoints.xsm}) {
    padding-inline: 0.5rem;
  }
`
const Wrapper = styled.div`
  width: 50%;
  @media (${(props) => props.theme.breakpoints.xlg}) {
    width: 60%;
  }
  @media (${(props) => props.theme.breakpoints.lg}) {
    width: 70%;
  }
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 80%;
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    width: 90%;
  }
  @media (${(props) => props.theme.breakpoints.xsm}) {
    width: 95%;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Item = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) => props.theme.colors.text.main};
`

const schemes = Object.keys(themes).map((item, i) => ({ id: i, name: item }))

const Settings = () => {
  const { scheme, setScheme } = useColorTheme()

  const onChange = (value) => {
    setScheme(value)
  }

  return (
    <Container>
      <Html title={'Settings'} />
      <Wrapper>
        <Item>
          <Text style={{ marginRight: '5rem' }}>Theme</Text>
          <Select
            value={schemes.find((s) => s.name === scheme).name}
            data={schemes}
            id={'name'}
            label={'name'}
            onChange={onChange}
          />
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Settings
