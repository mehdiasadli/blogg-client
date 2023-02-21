import { useQueryClient } from 'react-query'
import { editCollection } from '../services/collection.api'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

export const useEditCollection = (effect = () => {}) => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const { mutate } = useMutate(({ id, data }) => editCollection(id, data), {
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
