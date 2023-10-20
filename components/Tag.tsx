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
            <div className='h-[26px] flex items-center gap-1 text-xs'>
                {config.icon && <config.icon width='18' height='18' />}
                <span style={{ color: `${config.color}!default` }}>{content}</span>
            </div>
        </Link>
    )
}

export default Tag
