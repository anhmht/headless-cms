<template>
  <div class="container">
    <div :class="$style.header">
      <h2>{{ $translate('title', category) }}</h2>
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
  computed: {
    categories(): any {
      return (this.$store.state as RootState).categories
    },
    category(): any {
      return this.categories.find(
        (item: any) => item.slug === (this as any).$route.params.slug
      )
    }
  },
  async fetch() {
    this.posts = await (this as any)
      .$content('post')
      .where({ category: this.category.id })
      .fetch()
  },
  watch: {
    '$route.params.slug': {
      handler() {
        this.$fetch()
      },
      immediate: true
    }
  }
})
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
</style>
