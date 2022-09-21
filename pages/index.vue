<template>
  <div class="container">
    <Banner />
    <el-row :gutter="24" :class="$style.content">
      <el-col :lg="18"><NewPosts :class="$style.posts" /></el-col>
      <el-col :lg="6"><TrendingPost /></el-col>
    </el-row>
  </div>
</template>

<script>
import Banner from '~/components/home/Banner.vue'
import NewPosts from '~/components/home/NewPosts.vue'
import TrendingPost from '~/components/home/TrendingPost.vue'
export default {
  components: { Banner, NewPosts, TrendingPost },
  middleware: ['categories']
}
</script>
<style lang="postcss" module>
.content {
  margin-top: var(--space-4x);
}
</style>
