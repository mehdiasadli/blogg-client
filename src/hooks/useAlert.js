import { useDispatch, useSelector } from 'react-redux'
import { clearAlert, createAlert } from '../context/slices/alert'

export const useAlert = () => {
  const dispatch = useDispatch()
  const { msg, variant } = useSelector((state) => state.alert)

  const setAlert = (msg, options = { variant: 'error', timeout: 5000 }) => {
    if (!options?.variant) options.variant = 'error'
    if (!options?.timeout) options.timeout = 5000

    dispatch(createAlert({ msg, variant: options.variant }))
    setTimeout(() => dispatch(clearAlert()), options.timeout)
  }

  return { message: msg, variant, setAlert }
}
