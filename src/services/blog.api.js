import axios from 'axios'
import { BASE, intercept } from '.'

const blogService = axios.create({
  baseURL: BASE + '/blog'
})

blogService.interceptors.request.use((config) => {
  return intercept(config)
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
