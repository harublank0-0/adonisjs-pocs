import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    /**
     * Fetch all posts ordered by creation date.
     * Returns an array of Post model instances.
     */

    const posts = await Post.query().orderBy('created_at', 'desc')

    return response.json(posts)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    /**
     * Create a new post using the create method
     * Lucide automatically sets `created_at` and `updated_at`
     */
    const post = await Post.create({
      title: request.input('title'),
      content: request.input('content'),
      status: 'draft',
    })

    return response.created(post)
  }

  /**
   * Show individual record
   */
  async show({ response, params }: HttpContext) {
    /**
     * Find a specific post by ID
     * Throws a 404 exception if not found
     */
    const post = await Post.findOrFail(params.id)
    return response.json(post)
  }

  /**
   * Edit individual record
   */
  async edit() {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    /**
     * Merge updates and save to database
     * The updated_at timestamp updates automatically.
     */
    await post
      .merge({
        title: request.input('title'),
        content: request.input('content'),
      })
      .save()

    return response.json(post)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    /**
     * Delete the post from the database
     * This triggeres any delete hooks defined on the model.
     */
    await post.delete()

    return response.noContent()
  }

  async published({ response }: HttpContext) {
    /**
     * Build a complex query using the query builder
     * Results are still Post model instances
     */
    const posts = await Post.query()
      .where('status', 'published')
      .whereNotNull('published_at')
      .where('created_at', '>', new Date('2024-01-01'))
      .orderBy('published_at', 'desc')
      .limit(10)

    return response.json(posts)
  }

  async search({ request, response }: HttpContext) {
    const searchTerm = request.input('q')
    /**
     * Use where clauses with operatos and multiple conditions.
     * The orWhere method adds OR conditions to the query
     */

    const posts = await Post.query()
      .where('title', 'iLike', `%${searchTerm}%`)
      .orWhere('content', 'ilike', `%${searchTerm}%`)
      .where('status', 'published')

    return response.json(posts)
  }
}
