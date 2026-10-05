import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { locales, defaultLocale } from './i18n/config'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HpBanner } from './collections/HpBanner';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            graphics: {
                Logo: '/components/admin/Logo#Logo',
                Icon: '/components/admin/Icon#Icon',
            },
        },
        meta: { titleSuffix: '- Rmal Hospitality' },
    },
    collections: [Users, Media, HpBanner],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [],
    localization: {
        locales: locales.map((l) => ({ code: l.code, label: l.label, rtl: l.dir === 'rtl' })),
        defaultLocale,
        fallback: true,
    },
})
