'use client'

import { useState } from 'react'
import { Comments as CommentsComponent } from 'pliny/comments'

import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
    const [loadComments, setLoadComments] = useState(false)
    return (
        <>
            {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
            {siteMetadata.comments && loadComments && (
                <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
            )}
        </>
    )
}
