import axios from 'axios'
import { BASE, intercept } from '.'

const collectionService = axios.create({
  baseURL: BASE + '/collection'
})

collectionService.interceptors.request.use((config) => {
  return intercept(config)
})

export const getCollection = async (collectionId) => await collectionService(`/${collectionId}`)
export const getCollections = async (page = 1, userId) =>
  await collectionService(`/user/${userId}?page=${page}`)
export const createCollection = async (name) => await collectionService.post('/', { name })
export const editCollection = async (collectionId, data) =>
  await collectionService.patch(`/edit/${collectionId}`, data)
export const deleteCollection = async (collectionId) =>
  await collectionService.delete(`/delete/${collectionId}`)
