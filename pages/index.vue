<template>
  <div>
    <h1>aaaa</h1>
    <el-button type="primary">ets</el-button>
    <li v-for="post of posts" :key="post.slug">
      <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
    </li>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog').fetch()
    console.log(posts)
    return {
      posts
    }
  }
}
</script>
