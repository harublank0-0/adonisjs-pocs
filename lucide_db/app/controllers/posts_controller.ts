import db from '@adonisjs/lucid/services/db'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    /**
     * Fetch all posts ordered by creation date.
     * Returns an array of Post model instances.
     */

    const posts = await Post.query()
      .where('status', 'published')
      /**
       * Preload the user relationshiop for all posts.
       * This executes two queries total: one for posts, one for all users
       */
      .preload('user')
      .orderBy('created_at', 'desc')
      /**
       * Paginate posts with 20 records per page
       * Always use orderBy to ensure consistent pagination
       */
      .paginate(page, limit)
    /**
     * Load user and their profile, plus all comments with their authors
     * Nested preloads work for any depth or relationships.
     */
    // const postsNestedRel = await Post.query()
    //   .preload('user', (query) => {
    //     query.preload('profile')
    //   })
    //   .preload('comments', (query) => {
    //     query.preload('author')
    //   })

    /**
     * Set the base URL for pagination links
     * This enables generating correct URLs in meta data
     */

    posts.baseUrl('/posts')

    return response.json(posts)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    // /**
    //  * Create a new post using the create method
    //  * Lucide automatically sets `created_at` and `updated_at`
    //  */
    // const post = await Post.create({
    //   title: request.input('title'),
    //   content: request.input('content'),
    //   status: 'draft',
    // })
    //
    // return response.created(post)

    /**
     * Wrap operations in transaction.
     * If any operation throws, all changes roll back automatically
     */
    const post = await db.transaction(async (trx) => {
      const user = auth.getUserOrFail()

      /**
       * Create the post using the transaction.
       * All model operations within this callback use the same transaction
       */
      const post = new Post()
      post.title = request.input('title')
      post.content = request.input('content')

      post.useTransaction(trx)

      await post.save()

      /**
       * Update user's post counte.
       * This shares the same transaction, ensuring both operations
       * succeed together or fail together
       */
      user.useTransaction(trx)

      user.postCount = user.postCount + 1

      await user.save()

      return post
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
        status: request.input('status') ?? 'draft',
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
