const BASES = {
  development: 'http://localhost:9898/api',
  production: process.env.REACT_APP_API_URI
}

export const BASE = BASES[process.env.NODE_ENV]
export const tokenKey = 'x-access-token'

export const intercept = (config) => {
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
}
