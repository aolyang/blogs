import type { ComputedFields } from 'contentlayer/source-files'

import { defineDocumentType, type FieldDefs } from 'contentlayer/source-files'
import { extractTocHeadings } from 'pliny/mdx-plugins/index.js'
import readingTime from 'reading-time'

import siteMetadata from '../data/siteMetadata'

const computedFields: ComputedFields = {
    readingTime: {
        type: 'json',
        resolve: (doc) => readingTime(doc.body.raw),
    },
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFilePath,
    },
    toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

export const blogFields: FieldDefs = {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
}

export const Blogs = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blog/**/*.mdx',
    contentType: 'mdx',
    fields: blogFields,
    computedFields: {
        ...computedFields,
        structuredData: {
            type: 'json',
            resolve: (doc) => ({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: doc.title,
                datePublished: doc.date,
                dateModified: doc.lastmod || doc.date,
                description: doc.summary,
                image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
                url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
            }),
        },
    },
}))
