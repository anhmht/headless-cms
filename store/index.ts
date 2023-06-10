import { extractStore } from '~/store/extractStore'
import { useActions } from './actions'
import { useGetters } from './getters'
import { useState } from './state'

export const useMainStore = defineStore('main', () => {
  return {
    ...extractStore(useState()),
    ...extractStore(useGetters()),
    ...extractStore(useActions())
  }
})
