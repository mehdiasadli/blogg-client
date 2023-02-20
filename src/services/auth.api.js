import axios from 'axios'
import { BASE } from './index'

const authService = axios.create({
  baseURL: BASE + '/auth'
})

export const signIn = async (data) => await authService.post('/signin', data)
export const signUp = async (data) => await authService.post('/signup', data)
