import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
export default function TimeLineList({ children }: Props) {
    return (
        <ol className='relative border-l border-gray-200 dark:border-gray-700 h-full'>
            {children}
        </ol>
    )
}
