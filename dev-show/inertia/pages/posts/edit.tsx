import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { Form, Link } from '@adonisjs/inertia/react'

type PageProps = InertiaProps<{
  post: Data.Post
}>

export default function PostsEdit(props: PageProps) {
  const { post } = props

  return (
    <div className="form-container">
      <Link route="posts.show" routeParams={{ id: post.id }}>
        &lsaquo; Back to post
      </Link>

      <h1>Edit Post</h1>

      <Form route="posts.update" routeParams={{ id: post.id }}>
        {({ errors }) => (
          <>
            <div>
              <label htmlFor="title">Post title</label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={post.title}
                data-invalid={errors.title ? 'true' : undefined}
              />
              {errors.title && <div>{errors.title}</div>}
            </div>

            <div>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                name="url"
                id="url"
                defaultValue={post.url}
                data-invalid={errors.url ? 'true' : undefined}
              />
              {errors.url && <div>{errors.url}</div>}
            </div>

            <div>
              <label htmlFor="summary">Short summary</label>
              <textarea
                name="summary"
                id="summary"
                rows={4}
                defaultValue={post.summary}
                data-invalid={errors.summary ? 'true' : undefined}
              />
              {errors.summary && <div>{errors.summary}</div>}
            </div>

            <div>
              <button type="submit" className="button">
                Update Post
              </button>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}

