import { useMutation } from 'react-query'

export const useMutate = (fn, config) => {
  const { mutate, isLoading, isFetching } = useMutation(fn, config)
  return { mutate, isLoading: isLoading || isFetching }
}
