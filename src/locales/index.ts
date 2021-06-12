import { createI18n } from 'vue-i18n'

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './en-US'
import zhLocale from './zh-CN' // import from runtime only

// import { getLanguage } from '@/utils/cookies'

const getLanguage = () => localStorage.getItem('language')

const messages = {
  'en-US': {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale
  }
}

export const getLocale = () => {
  const storageLanguage = getLanguage()
  if (storageLanguage) {
    return storageLanguage
  }
  const language = navigator.language
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is zh-CN
  return 'zh-CN'
}
export const setLanguage = (lang:string) => localStorage.setItem('language', lang)

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
