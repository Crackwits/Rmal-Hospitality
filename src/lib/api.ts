import { getPayload, type CollectionSlug, type DataFromCollectionSlug, type Where } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/config'

export type QueryOptions = {
    locale: Locale
    where?: Where                 // extra filters, any Payload operator
    page?: number
    limit?: number
    sort?: string                 // e.g. '-createdAt' or 'price'
    depth?: number
    /** Field that marks published docs. Default 'status'. Use '_status' for drafts-enabled collections, or false for none. */
    publishedField?: string | false
    publishedValue?: string
}

const withPublished = (o: QueryOptions): Where => {
    const field = o.publishedField === undefined ? 'status' : o.publishedField
    const published: Where | null = field
        ? { [field]: { equals: o.publishedValue ?? 'published' } }
        : null
    return published ? { and: [published, ...(o.where ? [o.where] : [])] } : (o.where ?? {})
}

export async function getAll<T extends CollectionSlug>(collection: T, o: QueryOptions) {
    const payload = await getPayload({ config })
    return payload.find({
        collection,
        where: withPublished(o),
        locale: o.locale,
        fallbackLocale: 'en',
        page: o.page ?? 1,
        limit: o.limit ?? 12,
        sort: o.sort ?? '-createdAt',
        depth: o.depth ?? 1,
    })
}

export async function getById<T extends CollectionSlug>(
    collection: T,
    id: number | string,
    o: Omit<QueryOptions, 'where' | 'page' | 'limit' | 'sort'>,
): Promise<DataFromCollectionSlug<T> | null> {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection,
        where: { and: [{ id: { equals: id } }, withPublished(o)] },
        locale: o.locale,
        fallbackLocale: 'en',
        limit: 1,
        depth: o.depth ?? 1,
    })
    return (docs[0] as DataFromCollectionSlug<T>) ?? null
}

export async function getBySlug<T extends CollectionSlug>(
    collection: T,
    slug: string,
    o: Omit<QueryOptions, 'where' | 'page' | 'limit' | 'sort'>,
): Promise<DataFromCollectionSlug<T> | null> {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection,
        where: { and: [{ slug: { equals: slug } }, withPublished(o)] },
        locale: o.locale,
        fallbackLocale: 'en',
        limit: 1,
        depth: o.depth ?? 1,
    })
    return (docs[0] as DataFromCollectionSlug<T>) ?? null
}