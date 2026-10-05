import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getDir } from '@/i18n/config'
import { Italiana } from "next/font/google";
import { Noto_Kufi_Arabic } from 'next/font/google';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider'
import '../globals.css'

// const italiana = Italiana({ subsets: ['latin'], variable: '--font-en' });
const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-en",
});
const notoKufiArabic = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-ar' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const isArabic = locale === 'ar';
  const language = locale as 'en' | 'ar'; // ✅ Cast to proper type

  return (
    <html lang={locale} dir={getDir(locale)}
      className={`${italiana.variable} ${notoKufiArabic.variable}`}>
      <body className={isArabic ? 'font-ar' : 'font-en'}>
        <SmoothScrollProvider duration={1.4} wheelMultiplier={0.8}>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}