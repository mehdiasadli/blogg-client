import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);

  min-height: 4rem;
  width: 40%;
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 65%;
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    width: 85%;
  }
  @media (${(props) => props.theme.breakpoints.xsm}) {
    width: 95%;
  }

  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) =>
    props.variant === 'error'
      ? props.theme.colors.secondary.dark
      : props.theme.colors.accent.dark};
  border-left: 2px solid
    ${(props) =>
      props.variant === 'error'
        ? props.theme.colors.secondary.dark
        : props.theme.colors.accent.dark};

  padding: 1rem;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  z-index: 10;
`

const Alert = ({ variant = 'error', alert }) => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      variant={variant}
    >
      {alert}
    </Container>
  )
}

export default Alert
