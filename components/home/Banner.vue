<template>
  <div :class="$style.root">
    <el-carousel height="500px">
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="item.id"
        :class="$style.item"
      >
        <nuxt-link :to="getSlug(item._path)">
          <img :src="posts[index].thumbnail" :alt="item.title" />
        </nuxt-link>

        <nuxt-link :class="$style.link" :to="getSlug(item._path)">{{
          item.title
        }}</nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
let posts = ref([])
let postsLocale = ref([])
const vm = useNuxtApp()

const banners = computed(() => {
  return vm.$i18n.locale.value === 'vn' ? posts.value : postsLocale.value
})

const locale = vm.$i18n.locale.value === 'vn' ? 'en' : vm.$i18n.locale.value

const { data: postVN } = await useAsyncData(() =>
  queryContent('post', 'vn').where({ isBanner: true }).find()
)

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
  return postEN
})

function getSlug(path) {
  return path.replace(`/${vm.$i18n.locale.value}`, '')
}

posts.value = postVN.value
postsLocale.value = dataLocale.value
</script>
<style lang="postcss" module>
.root {
  .item {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      filter: brightness(0.8);
    }
    .link {
      position: absolute;
      bottom: var(--space-3x);
      left: var(--space-2x);
      font-size: 3rem;
      color: #fff;
    }
  }
}
</style>
