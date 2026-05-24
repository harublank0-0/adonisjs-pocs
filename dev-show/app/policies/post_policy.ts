import User from '#models/user'
import Post from '#models/post'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PostPolicy extends BasePolicy {
  /**
   * Only the post owner can edit their post
   */
  edit(user: User, post: Post) {
    return user.id === post.userId
  }

  /**
   * Only the post owner can delete their post
   */
  delete(user: User, post: Post) {
    return user.id === post.userId
  }
}
