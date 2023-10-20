import type { Metadata } from 'next'
import type { AnalyticsConfig } from 'pliny/analytics'
import type { SearchConfig } from 'pliny/search'

import { Inter } from 'next/font/google'
import { Analytics } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import 'css/tailwind.css'
import 'css/ui.css'
import 'pliny/search/algolia.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'

import { ThemeProviders } from './theme-providers'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.title}`,
    },
    description: siteMetadata.description,
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: './',
        siteName: siteMetadata.title,
        images: [siteMetadata.socialBanner],
        locale: 'zh-CN',
        type: 'website',
    },
    alternates: {
        canonical: './',
        types: {
            'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: siteMetadata.title,
        card: 'summary_large_image',
        images: [siteMetadata.socialBanner],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang={siteMetadata.language}
            className={`${inter.variable} scroll-smooth`}
            suppressHydrationWarning
        >
            <link
                rel='apple-touch-icon'
                sizes='76x76'
                href='/static/favicons/apple-touch-icon.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/static/favicons/favicon-32x32.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/static/favicons/favicon-16x16.png'
            />
            <link rel='manifest' href='/static/favicons/site.webmanifest' />
            <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
            <meta name='msapplication-TileColor' content='#000000' />
            <meta name='theme-color' media='(prefers-color-scheme: light)' content='#fff' />
            <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#000' />
            <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
            <body className='bg-white text-black antialiased dark:bg-gray-800 dark:text-white'>
                <ThemeProviders>
                    <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
                    <section className='mx-auto px-8 max-w-3xl sm:px-6 xl:max-w-2xl xl:px-0'>
                        <div className='flex h-screen flex-col justify-between font-sans'>
                            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                                <Header />
                                {children}
                            </SearchProvider>
                            <Footer />
                        </div>
                    </section>
                </ThemeProviders>
            </body>
        </html>
    )
}
