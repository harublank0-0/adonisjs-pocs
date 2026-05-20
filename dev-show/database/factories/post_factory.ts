import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      title: faker.helpers.arrayElement([
        'My First iOS Weather App',
        'Personal Portfolio Website with Dark Mode',
        'Real-time Chat Application',
        'Expense Tracker Progressive Web App',
        'Markdown Blog Engine',
        'Recipe Finder with AI Recommendations',
        '2D Platformer Game in JavaScript',
        'Task Management Dashboard',
        'URL Shortener with Analytics',
        'Fitness Tracking Mobile App',
      ]),
      url: faker.internet.url(),
      summary: faker.lorem.paragraph(3),
    }
  })
  .build()
