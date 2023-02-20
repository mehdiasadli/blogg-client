import styled from 'styled-components'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import { useState } from 'react'

const Container = styled.div`
  position: relative;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }

  display: flex;
`
const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  border: none;
  background-color: ${(props) => props.theme.colors.background.light};
  border-bottom: 1px solid
    ${(props) =>
      props.isError ? props.theme.colors.secondary.main : props.theme.colors.primary.main};
  padding-left: 0.5rem;
  color: ${(props) => props.theme.colors.text.main};

  &:focus {
    outline: none;
  }
`
const IconContainer = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const EyeOn = styled(VisibilityRoundedIcon)`
  color: ${(props) => props.theme.colors.text.main};
`
const EyeOff = styled(VisibilityOffRoundedIcon)`
  color: ${(props) => props.theme.colors.text.main};
`

const Field = ({
  value,
  onChange,
  placeholder,
  disabled,
  isError,
  error,
  password,
  icon,
  height = '2.5rem',
  width,
  ...rest
}) => {
  const [showPwd, setShowPwd] = useState(false)

  return (
    <Container height={height} width={width}>
      <Tooltip
        TransitionComponent={Zoom}
        title={isError ? error : placeholder}
        arrow
        placement='top'
      >
        <Input
          value={value}
          placeholder={placeholder}
          onChange={({ target: { value } }) => onChange(value)}
          disabled={disabled}
          isError={isError}
          type={password && !showPwd ? 'password' : 'text'}
          {...rest}
        />
      </Tooltip>
      {icon && <IconContainer>{icon}</IconContainer>}
      {password && (
        <IconContainer>
          {showPwd ? (
            <EyeOff fontSize='20px' onClick={() => setShowPwd(false)} />
          ) : (
            <EyeOn fontSize='20px' onClick={() => setShowPwd(true)} />
          )}
        </IconContainer>
      )}
    </Container>
  )
}

export default Field
