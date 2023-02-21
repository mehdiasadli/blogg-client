import { useQueryClient } from 'react-query'
import { deleteCollection } from '../services/collection.api'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

export const useDeleteCollection = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const { mutate } = useMutate((id) => deleteCollection(id), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries()
      setAlert(data.msg, { variant: 'success' })
    }
  })

  return { mutate }
}
