import { useState } from './state'

export const useGetters = defineStore('getters', () => {
  const state = useState()
  function getCategories() {
    return state.categories
  }
  return {
    getCategories
  }
})
