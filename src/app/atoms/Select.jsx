import { capitalize } from '@mui/material'
import styled from 'styled-components'

const Container = styled.select`
  height: 2.5rem;
  width: 20rem;
  border: 1px solid ${(props) => props.theme.colors.background.light};
  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) => props.theme.colors.text.main};
  border-radius: 3px;
  &:focus {
    outline: none;
  }
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
  cursor: pointer;
`
const Option = styled.option``

const Select = ({ data, value, id = '_id', label = 'name', onChange, ...rest }) => {
  return (
    <Container value={value} onChange={({ target: { value } }) => onChange(value)} {...rest}>
      {data?.map((item) => (
        <Option key={item[id]} value={item[id]}>
          {capitalize(item[label])}
        </Option>
      ))}
    </Container>
  )
}

export default Select
