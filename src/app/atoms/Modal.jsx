import Dialog from '@mui/material/Dialog'
import styled from 'styled-components'
import Button from './Button'

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background.main};
  color: ${(props) => props.theme.colors.text.main};
  gap: 0.5rem;
  
`
const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`

const Modal = ({
  children,
  open,
  close,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm
}) => {
  return (
    <Dialog open={open} onClose={close}>
      <Container>
        {children}
        <Actions>
          <Button onClick={close} width={'10rem'} full={false}>
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              close()
            }}
            width={'10rem'}
            full={false}
          >
            {confirmLabel}
          </Button>
        </Actions>
      </Container>
    </Dialog>
  )
}

export default Modal
