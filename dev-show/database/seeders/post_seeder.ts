import { CommentFactory } from '#database/factories/comment_factory'
import { PostFactory } from '#database/factories/post_factory'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const user = await User.findByOrFail('email', 'jane@example.com')
    const posts = await PostFactory.merge({
      userId: user.id,
    }).createMany(10)

    for (const post of posts) {
      await CommentFactory.merge({
        postId: post.id,
        userId: user.id,
      }).createMany(Math.floor(Math.random() * 3) + 3)
    }
  }
}
