import styled from 'styled-components'
import { Link as L } from 'react-router-dom'

const P = styled(L)`
  text-decoration: none;
  color: ${(props) => props.color || props.theme.colors.text.main};
  position: relative;
  font-style: italic;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:before {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.text.main};
    transition: all 0.2s ease;
    transform: scale(0);
    z-index: 2;
  }
  &:hover {
    color: ${(props) => props.theme.colors.text.dark};
    &:before {
      transform: scale(1);
      background-color: ${(props) => props.theme.colors.text.dark};
    }
  }
`

const Link = ({ color, to, children }) => {
  return (
    <P to={to} color={color}>
      {children}
    </P>
  )
}

export default Link
