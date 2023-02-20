import { useGetCollections } from './useGetCollections'
import { useState } from 'react'
import { useAlert } from './useAlert'
import { useCreateCollection } from './useCreateCollection'

export const useCollectionList = () => {
  const [page, setPage] = useState(1)
  const { collections, isLoading } = useGetCollections(page)
  const { setAlert } = useAlert()

  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  const { mutate } = useCreateCollection(() => setName(''))

  const handlePaginate = (_, value) => {
    setPage(value)
  }

  function close() {
    setIsOpen(false)
  }
  function open() {
    setIsOpen(true)
  }

  const handleChange = (value) => {
    setName(value)
  }

  const handleSubmit = () => {
    if (!name) {
      setAlert('Collection title is required')
      return
    }
    mutate(name)
  }

  return {
    collections,
    isLoading,
    isOpen,
    page,
    handlePaginate,
    close,
    open,
    handleChange,
    handleSubmit,
    name
  }
}
