<template>
  <div class="container">
    <Banner />
    <el-row :gutter="24" :class="$style.content">
      <el-col :lg="18">
        <NewPosts :class="$style.posts" key="post-1" />
        <Feature :class="$style.categoryPost" />
        <NewPosts :class="$style.categoryPost" :skip="3" key="post-2" />
      </el-col>
      <el-col :lg="6"><TrendingPost is-side-bar :limit="5" /></el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>
<style lang="postcss" module>
.content {
  margin-top: var(--space-4x);
}
.categoryPost {
  padding: var(--space-2x) 0;
  border-top: 1px solid #eeeeee;
}
</style>
