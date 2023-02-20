import axios from 'axios'
import { tokenKey, BASE } from '.'

const blogService = axios.create({
  baseURL: BASE + '/blog'
})

blogService.interceptors.request.use((config) => {
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

export const getAllBlogs = async (page = 1) => await blogService(`/all?page=${page}`)
export const getUsersBlogs = async (page = 1, userId) =>
  await blogService(`/user/${userId}?page=${page}`)
export const getBlog = async (id) => await blogService(`/${id}`)
export const getBlogs = async (page = 1, id) => await blogService(`/collection/${id}?page=${page}`)
export const createBlog = async (collectionId, data) =>
  await blogService.post(`/${collectionId}`, data)
export const editBlog = async (id, data) => await blogService.patch(`/edit/${id}`, data)
export const deleteBlog = async (id) => await blogService.delete(`/delete/${id}`)
