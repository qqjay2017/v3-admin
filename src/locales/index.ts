import { createI18n } from 'vue-i18n'

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './en'
import zhLocale from './zh' // import from runtime only

console.log(elementEnLocale.name)

const getLanguage = () => localStorage.getItem('language')

const messages = {

  [elementEnLocale.name]: {

    ...enLocale,
    ...elementEnLocale,
    el: elementEnLocale.el

  },
  [elementZhLocale.name]: {
    ...zhLocale,
    ...elementZhLocale,
    el: elementZhLocale.el
  }
}

console.log(messages, 'messages', elementZhLocale.name, elementEnLocale.name)

export const getLocale = () => {
  const storageLanguage = getLanguage()
  if (storageLanguage) {
    return storageLanguage
  }
  const language = navigator.language.split('-')[0]
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is zh
  return 'zh-cn'
}
export const setLanguage = (lang:string) => localStorage.setItem('language', lang)

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
