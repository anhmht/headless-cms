import { NuxtAppOptions, Plugin } from '@nuxt/types'

const translate = (key: string, object: any, context: NuxtAppOptions) => {
  return object[
    `${key}${(context.i18n.locale as string).toUpperCase()}`
  ] ?? object.title
}

const dataHelperPlugin: Plugin = ({ app }, inject) => {
  inject('translate', (key: string, object: any) => translate(key, object, app))
}

export default dataHelperPlugin

interface DataHelperSchema {
  $translate: typeof translate
}

declare module 'vue/types/vue' {
  interface Vue extends DataHelperSchema { }
}
