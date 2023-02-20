import axios from 'axios'
import { tokenKey, BASE } from '.'

const collectionService = axios.create({
  baseURL: BASE + '/collection'
})

collectionService.interceptors.request.use((config) => {
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.auth)?.user

  if (!user) {
    config.headers[tokenKey] = ''
    return
  }

  const token = user.token
  if (!token) {
    config.headers[tokenKey] = ''
    return
  }

  config.headers[tokenKey] = token

  return config
})

export const getCollection = async (collectionId) => await collectionService(`/${collectionId}`)
export const getCollections = async (page = 1, userId) =>
  await collectionService(`/user/${userId}?page=${page}`)
export const createCollection = async (name) => await collectionService.post('/', { name })
export const editCollection = async (collectionId, data) =>
  await collectionService.patch(`/edit/${collectionId}`, data)
export const deleteCollection = async (collectionId) =>
  await collectionService.delete(`/delete/${collectionId}`)
