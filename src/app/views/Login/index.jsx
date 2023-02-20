import Title from '../../atoms/Title'
import Link from '../../atoms/Link'
import { useLogin } from '../../../hooks/useLogin'
import { AuthContainer } from '../../../assets'

const Login = () => {
  const { Form } = useLogin()

  return (
    <AuthContainer>
      <Title>Login</Title>
      <Form />
      <Link to='/auth/register'>Don't have an account? Signup here!</Link>
    </AuthContainer>
  )
}

export default Login
