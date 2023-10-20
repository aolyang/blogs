import type { ReactNode } from 'react'

import TimelineListItem from '@/components/TimelineListItem'

type Props = {
    title: ReactNode
    subTitle: ReactNode
    children: ReactNode
}
export default function TimelineListArticle({ title, subTitle, children }: Props) {
    return (
        <TimelineListItem>
            <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>
            <time className='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                {subTitle}
            </time>
            <div className='text-base font-normal text-gray-500 dark:text-gray-400'>{children}</div>
        </TimelineListItem>
    )
}
