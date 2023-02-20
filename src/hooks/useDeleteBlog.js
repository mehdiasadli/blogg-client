import { useQueryClient } from 'react-query'
import { deleteBlog } from '../services/blog.api'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const { mutate } = useMutate((id) => deleteBlog(id), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries('blogs')
      setAlert(data.msg, { variant: 'success' })
    }
  })

  return { mutate }
}
