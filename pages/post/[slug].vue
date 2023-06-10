<template>
  <div :class="[$style.root, 'container']">
    <div v-if="post.vn">
      <img
        :class="$style.banner"
        :src="post.vn.thumbnail"
        :alt="post[$i18n.locale].title"
      />
      <Breadcrumb
        :categoryId="post.vn.category"
        :title="post[$i18n.locale].title"
      />
      <h1>{{ post[$i18n.locale].title }}</h1>
      <p>{{ post[$i18n.locale].summary }}</p>
      <ContentRenderer :value="post[$i18n.locale]" />
    </div>
  </div>
</template>

<script setup>
let post = ref({})
const vm = useNuxtApp()
const route = useRoute()
const availableLocales = computed(() => {
  return vm.$i18n.locales.value
})

const { data } = await useAsyncData(async () => {
  const result = {}
  await Promise.all(
    availableLocales.value.map(async (locale) => {
      const res = await queryContent(
        'post',
        locale.code,
        route.params.slug
      ).findOne()
      if (res) {
        result[locale.code] = res
      }
    })
  )
  return result
})

post.value = data.value
</script>
<style lang="postcss" module>
.root {
  font-size: 1.5rem;
  .banner {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  img {
    margin: var(--space-2x) auto;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    margin: var(--space-3x) 0;
    color: #000;
  }
  h2 {
    font-size: 2rem;
    margin: var(--space-2x) 0;
  }
  p {
    margin: 4px 0;
  }
}
</style>
