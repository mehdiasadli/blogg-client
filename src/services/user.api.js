// getUserByUsername
import axios from 'axios'
import { tokenKey, BASE } from '.'

const userService = axios.create({
  baseURL: BASE + '/user'
})

userService.interceptors.request.use((config) => {
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

export const getUserByUsername = async (username) => await userService(`/${username}`)
