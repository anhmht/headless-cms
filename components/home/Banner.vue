<template>
  <div :class="$style.root">
    <el-carousel height="500px">
      <el-carousel-item
        v-for="item in posts"
        :key="item.id"
        :class="$style.item"
      >
        <nuxt-link :to="item.path">
          <img :src="item.thumbnail" alt="aa" />
        </nuxt-link>

        <nuxt-link :class="$style.link" :to="item.path">{{
          item.title
        }}</nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await this.$content('post').where({ isBanner: true }).fetch()
  }
})
</script>
<style lang="postcss" module>
.root {
  .item {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
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
