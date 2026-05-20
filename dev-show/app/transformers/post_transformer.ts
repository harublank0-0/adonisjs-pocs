import { BaseTransformer } from '@adonisjs/core/transformers'
import Post from '#models/post'
import UserTransformer from './user_transformer.ts'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'url', 'summary', 'createdAt']),
      author: UserTransformer.transform(this.resource.user),
    }
  }
}
