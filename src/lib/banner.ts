import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'
import type { Locale } from '@/i18n/config'

export const getHomeBanner = cache(async (locale: Locale) => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'hpbanner',
    where: { status: { equals: 'published' } },
    locale,
    fallbackLocale: 'en',
    sort: '-updatedAt',
    limit: 1,
    depth: 1, // populates background_image as a full Media object
  })

  return docs[0] ?? null
})