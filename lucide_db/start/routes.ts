/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

// Routes for /posts controller
router.group(() => {
  router.post('/posts', [controllers.Posts, 'store'])

  router.get('/posts', [controllers.Posts, 'index'])

  router.get('/posts/:id', [controllers.Posts, 'show'])

  router.put('/posts/:id', [controllers.Posts, 'update'])

  router.delete('/posts/:id', [controllers.Posts, 'destroy'])
})

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
