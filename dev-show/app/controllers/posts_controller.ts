import Post from '#models/post'
import PostPolicy from '#policies/post_policy'
import PostTransformer from '#transformers/post_transformer'
import { createPostValidator, updatePostValidator } from '#validators/post'
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
      post: PostTransformer.transform(post).useVariant('forDetailedView'),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('posts/create', {})
  }

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)

    await Post.create({
      ...payload,
      userId: auth.user!.id,
    })

    return response.redirect().toRoute('posts.index')
  }

  /**
   * Show the edit form
   */
  async edit({ bouncer, params, inertia }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    // check if the current user can edit this post
    await bouncer.with(PostPolicy).authorize('edit', post)

    return inertia.render('posts/edit', {
      post: PostTransformer.transform(post),
    })
  }

  /**
   * Update the post
   */
  async update({ bouncer, params, request, response, session }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    // check authorizaion again.
    // someone could send PUT request directly
    await bouncer.with(PostPolicy).authorize('edit', post)

    // validate and update the post
    const data = await request.validateUsing(updatePostValidator)

    await post.merge(data).save()

    session.flash('success', 'Post Update successfully')

    return response.redirect().toRoute('posts.show', {
      id: post.id,
    })
  }
}
