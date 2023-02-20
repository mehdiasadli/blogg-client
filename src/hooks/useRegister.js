import { useFormFields } from './useFormFields'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

import { registerForm } from '../data/forms'
import { signUp } from '../services/auth.api'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const navigate = useNavigate()
  const { setAlert } = useAlert()
  const { Form } = useFormFields(registerForm, onSubmit)

  const { mutate } = useMutate(signUp, {
    onSuccess: ({ data }) => {
      navigate('/auth', { state: data })
    },
    onError: (err) => {
      setAlert(err, { timeout: 5000 })
    }
  })

  function onSubmit(data) {
    mutate(data)
  }

  return { Form }
}
