import { useEffect, useState } from 'react'
import { getUsersBlogs } from '../services/blog.api'
import { useAlert } from './useAlert'
import { useAuth } from './useAuth'
import { useFetch } from './useFetch'

export const useGetUsersBlogs = (page, userId = null) => {
  const { user } = useAuth()
  const { setAlert } = useAlert()

  const [blogs, setBlogs] = useState([])

  const { isLoading, refetch } = useFetch('blogs', () => getUsersBlogs(page, userId || user._id), {
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
