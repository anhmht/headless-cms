export interface State {
  categories: Array<any>
}

export const useState = defineStore({
  id: 'state',

  state: (): State => {
    return {
      categories: []
    }
  }
})
