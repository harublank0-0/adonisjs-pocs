import { CommentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Post from '#models/post'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Comment extends CommentSchema {
  // a comment belongs to a post
  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  // a comment belongs to a user
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
