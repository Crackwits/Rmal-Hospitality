import type { CollectionConfig } from 'payload'
import type { Access } from 'payload'
const publishedOnly: Access = ({ req }) => {
    if (req.user) return true // logged-in admins see everything
    return { status: { equals: 'published' } }
}
export const HpBanner: CollectionConfig = {
    slug: 'hpbanner',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'updatedAt'],
    },
    access: { read: publishedOnly }, // public read; create/update/delete need a logged-in user by default
    fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'slug', type: 'text', required: true, unique: true, index: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'cta_text', type: 'text', required: true, localized: true },
        { name: 'background_image', type: 'upload', relationTo: 'media' },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
        },
    ],
}