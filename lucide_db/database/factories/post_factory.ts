import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(3),
      status: faker.helpers.arrayElement(['published', 'draft']),
    }
  })
  .state('published', (post) => {
    post.status = 'published'
    post.publishedAt = new Date()
  })
  .state('draft', (post) => {
    post.status = 'draft'
  })
  .build()
