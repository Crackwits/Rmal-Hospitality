// src/app/(frontend)/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server'
import HomeTemplate from '@/components/design/templates/HomeTemplate'
import { getHomeBanner } from '@/lib/banner'
import type { Locale } from '@/i18n/config'

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const banner = await getHomeBanner(locale)
  if (!banner) return null

  return <HomeTemplate data={banner} lang={locale} />
}