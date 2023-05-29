<template>
  <div class="container">
    <Banner />
    <el-row :gutter="24" :class="$style.content">
      <el-col :lg="18">
        <NewPosts :class="$style.posts" />
        <Feature :class="$style.categoryPost" />
        <NewPosts :class="$style.categoryPost" :skip="3" />
      </el-col>
      <el-col :lg="6" :class="$style.sticky"
        ><TrendingPost is-side-bar :limit="5"
      /></el-col>
    </el-row>
  </div>
</template>

<script>
import Banner from '~/components/home/Banner.vue'
import NewPosts from '~/components/home/NewPosts.vue'
import TrendingPost from '~/components/home/TrendingPost.vue'
import Feature from '~/components/home/Feature.vue'
export default {
  components: { Banner, NewPosts, TrendingPost, Feature }
}
</script>
<style lang="postcss" module>
.content {
  margin-top: var(--space-4x);
}
.sticky {
  position: sticky;
  top: 80px;
}
.categoryPost {
  padding: var(--space-2x) 0;
  border-top: 1px solid #eeeeee;
}
</style>
