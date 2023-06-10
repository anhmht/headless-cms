import { useState } from './state'

export const useActions = defineStore('actions', () => {
  const state = useState()

  function setCategories(payload: Array<any>) {
    state.categories = payload
  }

  // Note you are free to define as many internal functions as you want.
  // You only expose the functions that are returned.
  return {
    setCategories
  }
})
