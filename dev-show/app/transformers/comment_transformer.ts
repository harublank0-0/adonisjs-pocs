import { BaseTransformer } from '@adonisjs/core/transformers'
import Comment from '#models/comment'
import UserTransformer from './user_transformer.ts'

export default class CommentTransformer extends BaseTransformer<Comment> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'content', 'createdAt']),
      author: UserTransformer.transform(this.resource.user),
    }
  }
}
