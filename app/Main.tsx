import type { Blog } from 'contentlayer/generated'

import { formatDate } from 'pliny/utils/formatDate'

import Hi from '@/assets/hi.svg'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import TimeLineList from '@/components/TimelineList'
import TimelineListArticle from '@/components/TimelineListArticle'
import TimelineListItem from '@/components/TimelineListItem'
import siteMetadata from '@/data/siteMetadata'

// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
    return (
        <>
            <div className='h-full divide-y divide-gray-200 dark:divide-gray-700'>
                <TimeLineList>
                    <TimelineListItem Icon={null}>
                        <h1 className='text-2xl'>{new Date().getFullYear()} Latest</h1>
                        <div className='flex items-center gap-2'>
                            <Hi />
                            welcome to my blogs site
                        </div>
                        <p className='pl-11'>latest posts here, feel free to comment.</p>
                    </TimelineListItem>
                    {posts.slice(0, MAX_DISPLAY).map((post: Blog) => {
                        const { slug, date, title, summary, tags } = post
                        return (
                            <TimelineListArticle
                                key={slug}
                                title={
                                    <Link
                                        href={`/blog/${slug}`}
                                        className='text-gray-900 dark:text-gray-100'
                                    >
                                        {title}
                                    </Link>
                                }
                                subTitle={
                                    <time dateTime={date}>
                                        {formatDate(date, siteMetadata.locale)}
                                    </time>
                                }
                            >
                                <div className='space-y-2 xl:items-baseline xl:space-y-0'>
                                    <p>{summary}</p>

                                    <div className='flex items-center'>
                                        {tags.map((tag) => (
                                            <Tag key={tag} text={tag} />
                                        ))}
                                    </div>
                                </div>
                            </TimelineListArticle>
                        )
                    })}
                </TimeLineList>
            </div>
            {posts.length > MAX_DISPLAY && (
                <div className='flex justify-end text-base font-medium leading-6'>
                    <Link
                        href='/blog'
                        className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                        aria-label='All posts'
                    >
                        All Posts &rarr;
                    </Link>
                </div>
            )}
            {/*{siteMetadata.newsletter?.provider && (*/}
            {/*    <div className='flex items-center justify-center pt-4'>*/}
            {/*        <NewsletterForm />*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    )
}
