import styled from 'styled-components'
import { motion } from 'framer-motion'
import Spinner from './Spinner'

const DEFAULT = {
  height: '3rem',
  radius: '3px',
  scale: 0.98,
  opacity: 0.9
}

const Container = styled(motion.button)`
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.bg || props.theme.colors.primary.main};
  color: ${(props) => props.col || props.theme.colors.text.light};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  box-shadow: ${(props) => props.theme.shadows.mid};
  border: none;
  border-radius: ${(props) => props.radius};

  ${(props) =>
    props.full === 'true' &&
    `
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
  `}

  &:disabled {
    cursor: default;
    background-color: ${(props) => props.dbg || props.theme.colors.background.dark};
    color: ${(props) => props.dc || props.theme.colors.text.main};
  }
`
const IconContainer = styled.div`
  position: absolute;
  top: 0;
  ${(props) => (props.position === 'left' ? 'left: 0;' : 'right: 0;')};

  height: 100%;
  aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = ({
  children,
  height = DEFAULT.height,
  width,
  bg,
  col,
  radius = DEFAULT.radius,
  disabled = false,
  shadow = true,
  dc,
  dbg,
  icon,
  loading,
  full = true,
  ...rest
}) => {
  return (
    <Container
      whileTap={{ scale: disabled ? 1 : DEFAULT.scale }}
      whileHover={{ opacity: DEFAULT.opacity }}
      height={height}
      width={width}
      bg={bg}
      col={col}
      radius={radius}
      disabled={disabled || loading}
      dc={dc}
      dbg={dbg}
      full={full ? 'true' : 'false'}
      {...rest}
    >
      {icon && <IconContainer position='left'>{icon}</IconContainer>}
      {children}
      {loading && (
        <IconContainer position='right'>
          <Spinner />
        </IconContainer>
      )}
    </Container>
  )
}

export default Button
