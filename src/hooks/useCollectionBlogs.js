import { useEffect, useState } from 'react'
import { getBlogs } from '../services/blog.api'
import { useAlert } from './useAlert'
import { useFetch } from './useFetch'

export const useCollectionBlogs = (page = 1, id) => {
  const { setAlert } = useAlert()

  const [blogs, setBlogs] = useState([])

  const { isLoading, refetch } = useFetch('blogs', () => getBlogs(page, id), {
    onError: (err) => {
      setAlert(err)
    },
    onSuccess: ({ data }) => {
      setBlogs(data)
    }
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return { blogs, isLoading }
}
