import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess, logout } from '../context/slices/auth'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isLoggedIn, isLoading, error } = useSelector((state) => state.auth)

  const startLogin = () => dispatch(loginStart())
  const setLoginSuccess = (data) => dispatch(loginSuccess(data))
  const setLoginFailure = (err) => dispatch(loginFailure(err))
  const logOut = () => dispatch(logout())

  return {
    startLogin,
    setLoginSuccess,
    setLoginFailure,
    logOut,
    isLoggedIn,
    isLoading,
    user,
    error
  }
}
