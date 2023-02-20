import Title from '../../atoms/Title'
import Link from '../../atoms/Link'
import { useRegister } from '../../../hooks/useRegister'
import { AuthContainer } from '../../../assets'

const Register = () => {
  const { Form } = useRegister()

  return (
    <AuthContainer>
      <Title>Register</Title>
      <Form />
      <Link to='/auth'>Already have an account? Login</Link>
    </AuthContainer>
  )
}

export default Register
