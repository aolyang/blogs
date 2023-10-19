import { slug } from 'github-slugger'
import Link from 'next/link'

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
            className='mr-3 text-sm font-medium uppercase ui-text-primary'
        >
            <span className='inline-flex items-center gap-1 text-sm'>
                {config.icon && <config.icon width='20' height='20' />}
                <span style={{ color: config.color }}>
                    <span className='inline-block py-1'>{content}</span>
                </span>
            </span>
        </Link>
    )
}

export default Tag
