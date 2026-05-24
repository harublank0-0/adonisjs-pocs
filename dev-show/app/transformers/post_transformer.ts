import { BaseTransformer } from '@adonisjs/core/transformers'
import Post from '#models/post'
import UserTransformer from './user_transformer.ts'
import CommentTransformer from './comment_transformer.ts'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import PostPolicy from '#policies/post_policy'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'url', 'summary', 'createdAt']),
      author: UserTransformer.transform(this.resource.user),
      comments: CommentTransformer.transform(this.whenLoaded(this.resource.comments))?.depth(2),
    }
  }

  /**
   * Include authorization data for the post detail view
   */
  @inject()
  async forDetailedView({ bouncer }: HttpContext) {
    return {
      ...this.toObject(),
      can: {
        edit: await bouncer.with(PostPolicy).allows('edit', this.resource),
        delete: await bouncer.with(PostPolicy).allows('delete', this.resource),
      },
    }
  }
}
