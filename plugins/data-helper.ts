
const translate = (key: string, object: any) => {
  const { $i18n } = useNuxtApp() as any
  return object[
    `${key}${(toRaw($i18n.locale).value as string).toUpperCase()}`
  ] ?? object.title
}

export default defineNuxtPlugin(() => {
  // You can alternatively use this format, which comes with automatic type support
  return {
    provide: {
      translate: (key: string, object: any) => translate(key, object)
    }
  }
})
