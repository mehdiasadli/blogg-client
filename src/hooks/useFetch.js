import { useQuery } from 'react-query'

export const useFetch = (key, fn, config) => {
  const { data, isLoading, isFetching, isError, refetch } = useQuery(key, fn, {
    ...config,
    refetchOnWindowFocus: false,
    retry: false
  })

  return { data, isLoading: isLoading || isFetching, isError, refetch }
}
