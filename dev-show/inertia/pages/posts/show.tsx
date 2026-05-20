import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

type PageProps = InertiaProps<{
  post: Data.Post
}>

export default function Show(props: PageProps) {
  const { post } = props

  return (
    <div className="container">
      <div>
        <h1>{post.title}</h1>
      </div>

      <div className="post">
        <div className="post-meta">
          <div>By {post.author.fullName}</div>

          <span>.</span>
          <div>
            <a href={post.url} target="_blank" rel="noreferrer">
              {post.url}
            </a>
          </div>
        </div>

        <div className="post-summary">{post.summary}</div>
      </div>
    </div>
  )
}
