import { useQueryClient } from 'react-query'
import { createCollection } from '../services/collection.api'
import { useAlert } from './useAlert'
import { useMutate } from './useMutate'

export const useCreateCollection = (effect = () => {}) => {
  const { setAlert } = useAlert()
  const queryClient = useQueryClient()

  const { mutate } = useMutate((name) => createCollection(name), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: ({ data }) => {
      setAlert(data.msg, { variant: 'success' })
      queryClient.refetchQueries('collections')
      effect()
    }
  })

  return { mutate }
}
