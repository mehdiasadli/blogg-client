import { useEffect, useState } from 'react'
import { getCollections } from '../services/collection.api'
import { useAlert } from './useAlert'
import { useAuth } from './useAuth'
import { useFetch } from './useFetch'

export const useGetCollections = (page = 1, userId = null) => {
  const { setAlert } = useAlert()
  const { user } = useAuth()

  const [collections, setCollections] = useState(null)
  const [collectionId, setCollectionId] = useState(null)

  const { isLoading, refetch } = useFetch(
    'collections',
    () => getCollections(page, userId || user._id),
    {
      onError: (err) => {
        setAlert(err)
      },
      onSuccess: ({ data }) => {
        if (data.data.length) {
          setCollections(data)
          setCollectionId(data.data[0]._id)
        }
      }
    }
  )

  const setId = (value) => setCollectionId(value)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return { collectionId, collections, isLoading, setId, refetch }
}
