import { Navigate } from 'react-router-dom'

const Private = ({ value, element, to = '/auth' }) => {
  return value ? element : <Navigate to={to} />
}

export default Private
