import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'
import { Form, Link } from '@adonisjs/inertia/react'

type PageProps = InertiaProps<{
  post: Data.Post
}>

export default function PostsShow(props: PageProps) {
  const { post } = props

  return (
    <div className="container">
      <Link route="posts.index">&lsaquo; Go back to posts listing</Link>
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

        <div className="post-comments">
          <h2>Comments</h2>

          <div className="post-comment-form">
            <Form route="comments.store" routeParams={{ id: post.id }}>
              {({ errors }) => (
                <>
                  <div>
                    <textarea
                      name="content"
                      rows={3}
                      placeholder="Share your thoughts..."
                      data-invalid={errors.content ? 'true' : undefined}
                    />
                    {errors.content && <div>{errors.content}</div>}
                  </div>

                  <div>
                    <button type="submit" className="button">
                      Post comment
                    </button>
                  </div>
                </>
              )}
            </Form>
          </div>

          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <p>{comment.content}</p>
                <div className="comment-meta">
                  By {comment.author.fullName} on{' '}
                  {comment.createdAt &&
                    new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
