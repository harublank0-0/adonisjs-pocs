import type { HttpContext } from '@adonisjs/core/http'
import { createCommentValidator } from '#validators/comment'
import Comment from '#models/comment'

export default class CommentsController {
  /**
   * Handle the form submission for creating a new comments
   */
  async store({ request, auth, params, response }: HttpContext) {
    const payload = await request.validateUsing(createCommentValidator)

    await Comment.create({
      ...payload,
      postId: params.id,
      userId: auth.user!.id,
    })

    return response.redirect().back()
  }
}
