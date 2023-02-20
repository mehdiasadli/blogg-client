import { useQueryClient } from 'react-query'
import { editBlog } from '../services/blog.api'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

export const useEditBlog = (effect = () => {}) => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const { mutate } = useMutate(({ id, data }) => editBlog(id, data), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries()
      setAlert(data.msg, { variant: 'success' })
      effect()
    }
  })

  return { mutate }
}
