import { useState } from 'react'
import { useCreateBlog } from './useCreateBlog'
import { useAlert } from './useAlert'
import { useCreateCollection } from './useCreateCollection'
import { useGetCollections } from './useGetCollections'

export const useWrite = () => {
  const { setAlert } = useAlert()
  const [data, setData] = useState({
    title: '',
    content: ''
  })

  const { collectionId, collections, isLoading, setId } = useGetCollections()
  const { mutate } = useCreateBlog(collectionId)
  const { mutate: createColl } = useCreateCollection()

  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  function open() {
    setIsOpen(true)
  }
  function close() {
    setIsOpen(false)
  }
  const handleTextChange = (value) => {
    setName(value)
  }
  const handleSubmit = () => {
    if (!name) {
      setAlert('Collection title is required')
      return
    }
    createColl(name)
  }

  const handlePublish = () => {
    mutate(data)
  }

  const handleChange = (value, name) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  return {
    title: data.title,
    content: data.content,
    handleChange,
    isLoading,
    collections,
    collectionId,
    setId,
    handlePublish,
    name,
    isOpen,
    open,
    close,
    handleSubmit,
    handleTextChange
  }
}
