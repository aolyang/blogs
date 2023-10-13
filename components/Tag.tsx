import Link from 'next/link'
import { slug } from 'github-slugger'
import getIcon from '@/components/tag-icons'

interface Props {
    text: string
}

const Tag = ({ text }: Props) => {
    const content = text.split(' ').join('-')
    const config = getIcon(content)

    return (
        <Link
            href={`/tags/${slug(text)}`}
            className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
        >
            <span className='inline-flex items-center gap-1 text-sm'>
                {config.icon && <config.icon width='20' height='20' />}
                <span className='py-1' style={{ color: config.color }}>
                    {content}
                </span>
            </span>
        </Link>
    )
}

export default Tag
