import styled from 'styled-components'

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.text.main};
`
export const HR = styled.hr`
  width: 100%;
  margin-block: 0.5rem;
  border: 0.5px solid ${(props) => props.theme.colors.text.main};
`
