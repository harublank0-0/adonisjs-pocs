import { PostSchema } from '#database/schema'
import { beforeFind, afterCreate } from '@adonisjs/lucid/orm'
import { DatabaseQueryBuilder } from '@adonisjs/lucid/database'

export default class Post extends PostSchema {
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
