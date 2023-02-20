import * as DOMPurify from 'dompurify'

export const parse = (htmlString) =>
  DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: ['p', 'em', 'strong', 'blockquote', 'u'] })

const removeTags = (string) => string.replace(/<\/?[^>]+(>|$)/g, ' ')

export const count = (string) => {
  const words = removeTags(string).match(/[a-z0-9]+/gi)
  return words ? words.length : 0
}
