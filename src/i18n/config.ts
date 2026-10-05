export const locales = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
  ] as const
  
  export type Locale = (typeof locales)[number]['code']
  export const localeCodes = locales.map((l) => l.code)
  export const defaultLocale: Locale = 'en'
  export const getDir = (code: string) => locales.find((l) => l.code === code)?.dir ?? 'ltr'