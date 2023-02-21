// getUserByUsername
import axios from 'axios'
import { BASE, intercept } from '.'

const userService = axios.create({
  baseURL: BASE + '/user'
})

userService.interceptors.request.use((config) => {
  return intercept(config)
})

export const getUserByUsername = async (username) => await userService(`/${username}`)
