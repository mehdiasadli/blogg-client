import styled from 'styled-components'

const Text = styled.h1`
  color: inherit;
  ${(props) =>
    props.family &&
    `
  font-family: 'Playfair Display', serif;
  `}
  ${(props) =>
    props.center === 'true' &&
    `
  text-align: center;
  `}
`

const Title = ({ as = 'h1', color, children, family = null, center = false, ...rest }) => {
  return (
    <Text as={as} color={color} family={family} center={center ? 'true' : 'false'} {...rest}>
      {children}
    </Text>
  )
}

export default Title
