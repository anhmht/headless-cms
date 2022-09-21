<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="post in posts" :key="post.id">
      <el-row :gutter="16">
        <el-col :span="12"><img :src="post.thumbnail" alt="aa" /></el-col>
        <el-col :span="12">
          <div :class="$style.content">
            <h1>{{ post.title }}</h1>
            <p>{{ summary(post.summary) }}</p>
            <nuxt-link :to="post.path">Xem thêm</nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '~/store/state'
export default Vue.extend({
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await (this as any).$content('post').limit(3).fetch()
  },
  computed: {
    categories() {
      return (this.$store.state as RootState).categories
    }
  },
  methods: {
    summary(summary: string): string {
      if (summary.length <= 250) {
        return summary
      }
      return `${summary.substring(0, 250)}...`
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  .item {
    padding-bottom: var(--space-2x);
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
  }
  .item + .item {
    padding-top: var(--space-2x);
    border-top: 1px solid #eeeeee;
  }
}
</style>
