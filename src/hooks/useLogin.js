import { useFormFields } from './useFormFields'
import { useAlert } from './useAlert'
import { useAuth } from './useAuth'
import { useMutate } from './useMutate'

import { loginForm } from '../data/forms'
import { signIn } from '../services/auth.api'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { setAlert } = useAlert()
  const { startLogin, setLoginFailure, setLoginSuccess, isLoading } = useAuth()
  const { Form } = useFormFields(loginForm, onSubmit)

  const { mutate } = useMutate(signIn, {
    onSuccess: ({ data: { data } }) => {
      setLoginSuccess(data)
    },
    onError: (err) => {
      setLoginFailure(err)
      setAlert(err, { timeout: 5000 })
    }
  })

  function onSubmit(data) {
    startLogin()
    mutate(data)
  }


  useEffect(() => {
    if (location.state?.msg) {
      setAlert(location.state?.msg, { variant: 'success' })
      navigate(location.pathname, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  return { Form, isLoading }
}
