import { Context, Middleware } from '@nuxt/types'
import { Mutations } from '~/store'


const categories: Middleware = async (app: Context) => {
  if (app.store.state.categories.length > 0) return
  const categories = await (app as any).$content('category').fetch()
  app.store.commit(Mutations.TYPE.SET_CATEGORIES, categories)
}

export default categories
