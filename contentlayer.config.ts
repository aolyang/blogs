import { makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import path from 'path'
import {
    remarkCodeTitles,
    remarkExtractFrontmatter,
    remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js' // DO NOT REMOVE index.js !!!
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
// Rehype packages
import rehypeSlug from 'rehype-slug'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { Blogs } from './contentlayer-configs/type-blogs'
import siteMetadata from './data/siteMetadata'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Blogs],
    mdx: {
        cwd: process.cwd(),
        remarkPlugins: [
            remarkExtractFrontmatter,
            remarkGfm,
            remarkCodeTitles,
            remarkMath,
            remarkImgToJsx,
        ],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeKatex,
            [rehypeCitation, { path: path.join(root, 'data') }],
            [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
            rehypePresetMinify,
        ],
    },
    onSuccess: async (importData) => {
        const { allBlogs } = await importData()

        const tagCount: Record<string, number> = {}
        allBlogs.forEach((file) => {
            if (file.tags && (!isProduction || file.draft !== true)) {
                const slugger = new GithubSlugger()
                file.tags.forEach((tag) => {
                    const formattedTag = slugger.slug(tag)
                    if (formattedTag in tagCount) {
                        tagCount[formattedTag] += 1
                    } else {
                        tagCount[formattedTag] = 1
                    }
                })
            }
        })
        writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))

        if (
            siteMetadata?.search?.provider === 'kbar' &&
            siteMetadata.search.kbarConfig.searchDocumentsPath
        ) {
            writeFileSync(
                `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
                JSON.stringify(allCoreContent(sortPosts(allBlogs)))
            )
            console.log('Local search index generated...')
        }
    },
})
