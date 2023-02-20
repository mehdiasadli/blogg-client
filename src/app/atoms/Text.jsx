import styled from 'styled-components'

const P = styled.p`
  color: ${(props) => props.color || 'inherit'};
  font-style: ${(props) => (props.italic ? 'italic' : 'regular')};
  ${(props) =>
    props.family &&
    `
  font-family: 'Playfair Display', serif;
  & p,
  & strong,
  & em,
  & span,
  & blockquote,
  & u {
    font-family: 'Playfair Display', serif !important;
  }
  `}
`

const Text = ({ color, children, italic = false, family = null, ...rest }) => {
  return (
    <P color={color} italic={italic} family={family} {...rest}>
      {children}
    </P>
  )
}

export default Text
