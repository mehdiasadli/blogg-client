import { useState } from 'react'
import { getBlog } from '../services/blog.api'
import { useAlert } from './useAlert'
import { useFetch } from './useFetch'

export const useGetBlog = (id) => {
  const { setAlert } = useAlert()
  const [blog, setBlog] = useState(null)

  const { isLoading } = useFetch(['blog', id], () => getBlog(id), {
    onError: (err) => setAlert(err),
    onSuccess: ({ data: { data } }) => {
      setBlog(data)
    }
  })

  return { blog, isLoading }
}
