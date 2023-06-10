import { useMainStore } from '@/store';
import { addRouteMiddleware, defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxt) => {
  addRouteMiddleware('categories', async () => {
    const store = useMainStore();
    const state = toRaw(store.categories)
    if (state.length > 0) return
    const categories = await queryContent('category').find()
    store.setCategories(categories)
  }, { global: true });
});
