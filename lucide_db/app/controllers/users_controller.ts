import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async show({ params, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('posts').firstOrFail()

    /**
     * Serialize the model to a plain object.
     * This automatically excludes sensitive fields and formates dates.
     */
    return response.json(
      user.serialize({
        fields: {
          omit: ['password', 'rememberMeToken'],
        },
        relations: {
          posts: {
            fields: {
              pick: ['id', 'title', 'createdAt'],
            },
          },
        },
      })
    )
  }
}
