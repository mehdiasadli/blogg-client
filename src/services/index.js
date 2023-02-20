const BASES = {
  development: 'http://localhost:9898/api',
  production: process.env.BASE
}

export const BASE = BASES[process.env.NODE_ENV]
export const tokenKey = 'x-access-token'