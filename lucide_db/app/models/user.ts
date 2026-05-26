import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import Post from './post.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  /**
   * Override password column to exclude from all serialization
   * Setting serializes to null prevents this field from appearing in JSON.
   */
  @column({ serializeAs: null })
  declare password: string

  /** override firstName column to rename in JSON output.
   * The database column is snake_case but json uses camelCase
   */
  @column({ serializeAs: 'firstName' })
  declare firstName: string

  /**
   * Define a one-to-many relationship.
   * A user can have multiple posts.
   */
  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  /**
   * Hash the password before saving to the database.
   * The hook runs before both inserts and updates.
   */
  // there's already a method named `hashPassword`
  @beforeSave()
  static async hashPasswordDemo(user: User) {
    /**
     * Only Hash if the password was modified
     * The $dirty object tracks which attributes changed.
     */
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
