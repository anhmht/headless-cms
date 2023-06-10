<template>
  <div class="container">
    <Breadcrumb
      :title="$translate('title', category)"
      :category-id="category.id"
      is-category
    />
    <div :class="$style.header">
      <h2>{{ $translate('title', category) }}</h2>
    </div>
    <div :class="$style.feature">
      <div
        :class="$style.item"
        v-for="(post, index) in displayFeatures"
        :key="post.id"
      >
        <nuxt-link :to="`/post/${post._slug}`">
          <img :src="posts[index].thumbnail" :alt="post.title" />
        </nuxt-link>
        <DisplayCategory :id="posts[index].category" :link="false" />
        <h3>
          <nuxt-link :to="`/post/${post._slug}`">{{ post.title }}</nuxt-link>
        </h3>
        <p>{{ summary(post.summary) }}</p>
      </div>
    </div>
    <div :class="$style.main">
      <div
        :class="$style.posts"
        v-for="(post, index) in displayPosts"
        :key="post.id"
      >
        <nuxt-link :to="`/post/${post._slug}`">
          <img :src="posts[index + 3].thumbnail" :alt="post.title" />
        </nuxt-link>
        <div>
          <DisplayCategory :id="posts[index].category" :link="false" />
          <h3>
            <nuxt-link :to="`/post/${post._slug}`">{{ post.title }}</nuxt-link>
          </h3>
          <p>{{ summary(post.summary, 250) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = ref([])
const postsLocale = ref([])
const vm = useNuxtApp()
const route = useRoute()
const category = computed(() => {
  return vm.$store.$state.categories.find(
    (item) => item._slug === route.params.slug
  )
})
const displayFeatures = computed(() => {
  if (process.server) return []
  return vm.$i18n.locale.value === 'vn'
    ? posts.value.slice(0, 3)
    : postsLocale.value.slice(0, 3)
})

const displayPosts = computed(() => {
  if (process.server) return []
  return vm.$i18n.locale.value === 'vn'
    ? posts.value.slice(3)
    : postsLocale.value.slice(3)
})

const summary = (summary, length = 250) => {
  if (summary.length <= length) {
    return summary
  }
  return `${summary.substring(0, length)}...`
}

const locale = vm.$i18n.locale.value === 'vn' ? 'en' : vm.$i18n.locale.value

const { data: postVN } = await useAsyncData(() =>
  queryContent('post', 'vn').where({ category: category.value.id }).find()
)

const { data: dataLocale } = await useAsyncData(async () => {
  const postEN = []
  await Promise.all(
    postVN.value.map(async (post) => {
      postEN.push(
        await queryContent('post', locale)
          .where({
            _slug: post._slug
          })
          .findOne()
      )
    })
  )
  return postEN
})

posts.value = postVN.value
postsLocale.value = dataLocale.value
</script>
<style lang="postcss" module>
.header {
  margin: 2rem 0;
  color: #000;
  text-align: center;
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
}
.feature {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2x);
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin-bottom: var(--space);
  }
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    margin: var(--space) 0;
  }
}
.item {
  flex: 1;
}
.main {
  margin-top: var(--space-4x);
}
.posts {
  display: flex;
  gap: var(--space-2x);
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: var(--space) 0;
    color: #000;
  }
  img {
    height: 250px;
    object-fit: cover;
    margin-bottom: var(--space);
  }
}
.posts + .posts {
  margin-top: var(--space-2x);
}
@media only screen and (max-width: 992px) {
  .feature {
    flex-direction: column;
    gap: var(--space-4x);
  }
  .posts {
    gap: var(--space);
    h3 {
      margin: var(--space-1o2) 0;
    }
    img {
      height: 150px;
      min-width: 150px;
      margin-bottom: 0;
    }
  }
}
</style>
