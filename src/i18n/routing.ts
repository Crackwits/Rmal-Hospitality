import { defineRouting } from 'next-intl/routing'
import { localeCodes, defaultLocale } from './config'

export const routing = defineRouting({
  locales: localeCodes,
  defaultLocale,
  localePrefix: 'always',
})