<template>
  <div :class="$style.root">
    <div
      :class="[
        `grid grid-cols-1 gap-x-6 xs:grid-cols-2 sm:grid-cols-4 ${
          isSideBar ? `lg:grid-cols-1` : `lg:grid-cols-4`
        } ${isSideBar ? `xl:gap-x-0` : ``}`,
        $style.posts
      ]"
    >
      <div
        :class="$style.item"
        v-for="(post, index) in newPosts"
        :key="post.id"
      >
        <div :class="$style.image">
          <img :src="posts[index].thumbnail" :alt="post.title" />
        </div>
        <div :class="$style.content">
          <DisplayCategory :id="posts[index].category" />
          <nuxt-link :to="getSlug(post._path)">
            <h4>{{ post.title }}</h4></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isSideBar: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 4
  }
})
const posts = ref([])
const postsLocale = ref([])
const vm = useNuxtApp()
const newPosts = computed(() => {
  return vm.$i18n.locale.value === 'vn' ? posts.value : postsLocale.value
})
async function fetchData() {
  posts.value = await queryContent('post', 'vn').limit(props.limit).find()
  postsLocale.value = []
  posts.value.forEach(async (element) => {
    postsLocale.value.push(
      await queryContent(
        'post',
        vm.$i18n.locale.value === 'vn' ? 'en' : vm.$i18n.locale.value
      )
        .where({
          _file: element._file.replace(
            'vn',
            vm.$i18n.locale.value === 'vn' ? 'en' : vm.$i18n.locale.value
          )
        })
        .findOne()
    )
  })
}
function getSlug(path) {
  return path.replace(`/${vm.$i18n.locale.value}`, '')
}
onMounted(async () => {
  await fetchData()
})
</script>
<style lang="postcss" module>
.root {
  position: sticky;
  top: 80px;
  .posts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space);
    flex-direction: column;
  }
  .item {
    display: flex;
    gap: var(--space);
    img {
      height: 100px;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    h4 {
      font-size: 1.2rem;
      margin-top: var(--space-1o2);
      color: #000;
    }
  }
  .image {
    width: 100px;
    min-width: 100px;
  }
  @media only screen and (max-width: 1200px) {
    .item {
      img {
        margin: auto;
      }
    }
  }
}
</style>
