import Post from '#models/post'
import PostTransformer from '#transformers/post_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ inertia }: HttpContext) {
    const posts = await Post.query().preload('user').orderBy('createdAt', 'desc')

    return inertia.render('posts/index', {
      posts: PostTransformer.transform(posts),
    })
  }

  async show({ inertia, params }: HttpContext) {
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('comments', (query) => {
        query.preload('user').orderBy('createdAt', 'asc')
      })
      .firstOrFail()

    return inertia.render('posts/show', {
      post: PostTransformer.transform(post),
    })
  }
}
