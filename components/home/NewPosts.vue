<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="(post, index) in newPosts" :key="post.id">
      <el-row :gutter="16">
        <el-col :sm="12">
          <nuxt-link :to="getSlug(post._path)" @click.native="active = post.id">
            <img
              :src="posts[index].thumbnail"
              :alt="post.title"
              :class="{ active: active === post.id }"
            />
          </nuxt-link>
        </el-col>
        <el-col :sm="12">
          <div :class="$style.content">
            <DisplayCategory :id="posts[index].category" />
            <nuxt-link :to="getSlug(post._path)">
              <h1>{{ post.title }}</h1>
            </nuxt-link>

            <p>{{ summary(post.summary) }}</p>
            <nuxt-link :to="getSlug(post._path)">{{ $t('more') }}</nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { useState } from '#app'
const active = useState()
const props = defineProps({
  skip: {
    type: Number,
    default: 0
  }
})
const posts = ref([])
const postsLocale = ref([])
const vm = useNuxtApp()

const newPosts = computed(() => {
  return vm.$i18n.locale.value === 'vn' ? posts.value : postsLocale.value
})

const { data: postVN } = await useAsyncData(`news-skip-${props.skip}`, () =>
  queryContent('post', 'vn').skip(props.skip).limit(3).find()
)

const locale = vm.$i18n.locale.value === 'vn' ? 'en' : vm.$i18n.locale.value

const { data: dataLocale } = await useAsyncData(
  `newsEN-skip-${props.skip}`,
  async () => {
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
  }
)

posts.value = postVN.value
postsLocale.value = dataLocale.value

function getSlug(path) {
  return path.replace(`/${vm.$i18n.locale.value}`, '')
}

function summary(summary) {
  if (summary.length <= 250) {
    return summary
  }
  return `${summary.substring(0, 250)}...`
}
</script>
<style lang="postcss" module scoped>
.root {
  .item {
    padding-bottom: var(--space-2x);
    position: relative;
    h1 {
      margin-top: var(--space);
    }
    img {
      height: 280px;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    p {
      font-size: 1.2rem;
      padding: var(--space) 0;
    }
    &::after {
      background-image: linear-gradient(
        transparent,
        var(--color-primary),
        transparent
      );
      height: 70px;
      width: 1px;
      position: absolute;
      right: -1px;
      top: 65%;
      content: '';
      opacity: 0;
      transition: all 0.3s ease;
    }
    &:hover {
      &::after {
        top: 25%;
        opacity: 1;
      }
    }
  }
  .item + .item {
    padding-top: var(--space-2x);
    border-top: 1px solid #eeeeee;
  }
}
</style>
<style scoped>
img.active {
  view-transition-name: selected-post;
  contain: layout;
}
</style>
