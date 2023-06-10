<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="(post, index) in features" :key="post.id">
      <nuxt-link :to="getSlug(post._path)">
        <img :src="posts[index].thumbnail" :alt="post.title" />
        <div :class="$style.content">
          <DisplayCategory :id="posts[index].category" :link="false" />
          <h3>{{ post.title }}</h3>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skip: {
    type: Number,
    default: 0
  }
})

const posts = ref([])
const postsLocale = ref([])
const vm = useNuxtApp()

const features = computed(() => {
  return vm.$i18n.locale.value === 'vn' ? posts.value : postsLocale.value
})

function getSlug(path) {
  return path.replace(`/${vm.$i18n.locale.value}`, '')
}

const { data: postVN } = await useAsyncData(() =>
  queryContent('post', 'vn').skip(props.skip).limit(3).find()
)

const locale = vm.$i18n.locale.value === 'vn' ? 'en' : vm.$i18n.locale.value

const { data: dataLocale } = await useAsyncData(async () => {
  const postEN = []
  await Promise.all(
    postVN.value.map(async (element) => {
      postEN.push(
        await queryContent('post', locale)
          .where({
            _slug: element._slug
          })
          .findOne()
      )
    })
  )
  return useSortBy(postEN, (item) =>
    postVN.value.indexOf(postVN.value.find((i) => i._slug === item._slug))
  )
})

posts.value = postVN.value
postsLocale.value = dataLocale.value
</script>
<style lang="postcss" module>
.root {
  display: flex;
  gap: var(--space);
  .item {
    position: relative;
    height: 300px;
    flex: 1;
    img {
      object-fit: cover;
      height: 100%;
      filter: brightness(0.6);
    }
  }
  .content {
    position: absolute;
    bottom: 0;
    padding: var(--space);
    color: #fff;
    h3 {
      font-size: 1.5rem;
    }
  }
}
@media only screen and (max-width: 992px) {
  .root {
    flex-direction: column;
  }
}
</style>
