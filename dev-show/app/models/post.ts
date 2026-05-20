import { PostSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Comment from '#models/comment'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Post extends PostSchema {
  // a post has many comments
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  // a post belongs to a user
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
