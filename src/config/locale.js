import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const FALLBACKLANG = 'en'
const LOADPATH = '/assets/locales/{{lng}}/translation.json'
export const languages = [
  {
    id: 1,
    code: 'en',
    name: 'English',
    countryCode: 'gb',
    shortName: 'EN'
  },
  {
    id: 2,
    code: 'az',
    name: 'Azərbaycan Dili',
    countryCode: 'az',
    shortName: 'AZ'
  }
]

const i18order = [
  'cookie',
  'htmlTag',
  'localStorage',
  'sessionStorage',
  'navigator',
  'path',
  'subdomain'
]

const loadPath = process.env.PUBLIC_URL + LOADPATH
const fallbackLng = FALLBACKLANG
const order = i18order
const caches = [i18order[0]]

export default i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: languages.map((lang) => lang.code),
    backend: { loadPath },
    fallbackLng,
    detection: {
      order,
      caches
    }
  })
