import { PostFactory } from '#database/factories/post_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    /**
     * Create a single post with fake data.
     * The factory generates random values for each field.
     */
    const post = await PostFactory.create()

    /**
     * Create multiple posts at once.
     * This generates 10 posts with unique fake data
     */
    const posts = await PostFactory.createMany(10)

    /**
     * Override speficic attributes while using fake data for others.
     * Useful when you need specific values for testing.
     */
    const publishedPost = await PostFactory.merge({
      status: 'published',
    }).create()

    /**
     * Create publishded posts using the state.
     * States provide reusable variations of your factory.
     */
    const publishdedState = await PostFactory.apply('published').createMany(5)
    const draftState = await PostFactory.apply('draft').createMany(5)
  }
}
