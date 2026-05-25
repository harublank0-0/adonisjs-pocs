/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  posts: {
    store: typeof routes['posts.store']
    index: typeof routes['posts.index']
    show: typeof routes['posts.show']
    update: typeof routes['posts.update']
    destroy: typeof routes['posts.destroy']
  }
}
