import { PostSchema } from '#database/schema'
import { beforeFind, afterCreate, belongsTo } from '@adonisjs/lucid/orm'
import { DatabaseQueryBuilder } from '@adonisjs/lucid/database'
import User from './user.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Post extends PostSchema {
  /**
   * Define the inverse relationship
   * Each post belongs to one user
   */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  /**
   * Automatically exclude sofe-deleted posts from queries
   * This hook modifies every find query to filter deleted records.
   */
  @beforeFind()
  static ignoreDeleted(query: DatabaseQueryBuilder) {
    query.where('isDeleted', false)
  }

  /**
   * Send notification after creating a post
   * After hooks receive the saved model instance
   */
  @afterCreate()
  static async notifyFollowers(post: Post) {
    // send notification to followers
  }
}
