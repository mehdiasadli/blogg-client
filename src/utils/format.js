// for firstName, lastName
export const formatName = (text) => {
  const value = text.replace(/[^a-zA-ZüçşıöəÜÇŞIÖƏ]/, '')
  return value.charAt(0).toUpperCase() + value.substring(1)
}

// for username
export const formatUsername = (text) => {
  const value = text.replace(/[^a-zA-Z0-9]/, '').toLowerCase()
  return value.trim()
}
