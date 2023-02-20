import { useNavigate } from 'react-router-dom'
import { createBlog } from '../services/blog.api'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

export const useCreateBlog = (collectionId) => {
  const navigate = useNavigate()
  const { setAlert } = useAlert()

  const { mutate } = useMutate((data) => createBlog(collectionId, data), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  return { mutate }
}
