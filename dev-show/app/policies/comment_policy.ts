import User from '#models/user'
import Comment from '#models/comment'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CommentPolicy extends BasePolicy {
  /**
   * Only the comment owner can delete their comment
   */
  delete(user: User, comment: Comment) {
    return user.id === comment.userId
  }
}
