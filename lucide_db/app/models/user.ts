import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { beforeSave, hasMany } from '@adonisjs/lucid/orm'
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
