import type { Blog } from 'contentlayer/generated'
import type { Metadata } from 'next'

import { allBlogs } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allCoreContent, coreContent, sortPosts } from 'pliny/utils/contentlayer'
import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import PostBanner from '@/layouts/PostBanner'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'

const defaultLayout = 'PostLayout'
const layouts = {
    PostSimple,
    PostLayout,
    PostBanner,
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string[] }
}): Promise<Metadata | undefined> {
    const slug = decodeURI(params.slug.join('/'))
    const post = allBlogs.find((p) => p.slug === slug)

    if (!post) {
        return
    }

    const publishedAt = new Date(post.date).toISOString()
    const modifiedAt = new Date(post.lastmod || post.date).toISOString()

    let imageList = [siteMetadata.socialBanner]
    if (post.images) {
        imageList = typeof post.images === 'string' ? [post.images] : post.images
    }
    const ogImages = imageList.map((img) => {
        return {
            url: img.includes('http') ? img : siteMetadata.siteUrl + img,
        }
    })

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: 'zh-CN',
            type: 'article',
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: './',
            images: ogImages,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary,
            images: imageList,
        },
    }
}

export const generateStaticParams = async () => {
    return allBlogs.map((p) => ({ slug: p.slug.split('/') }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join('/'))
    // Filter out drafts in production
    const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
    if (postIndex === -1) {
        return (
            <div className='mt-24 text-center'>
                <PageTitle>
                    Under Construction{' '}
                    <span role='img' aria-label='roadwork sign'>
                        🚧
                    </span>
                </PageTitle>
            </div>
        )
    }

    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const post = allBlogs.find((p) => p.slug === slug) as Blog

    const mainContent = coreContent(post)

    const Layout = layouts[post.layout || defaultLayout]

    return (
        <>
            <Layout content={mainContent} next={next} prev={prev}>
                <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
            </Layout>
        </>
    )
}
