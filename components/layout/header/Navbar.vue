<template>
  <div :class="$style.root">
    <div :class="$style.item">
      <nuxt-link to="/">Home</nuxt-link>
    </div>
    <div v-for="item in categories" :class="$style.item" :key="item.id">
      <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
    </div>
    <div :class="$style.item">
      <nuxt-link to="/">Liên hệ</nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      categories: []
    }
  },
  async fetch() {
    this.categories = await this.$content('category').fetch()
  }
})
</script>
<style lang="postcss" module>
.root {
  display: flex;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  padding: var(--space) 0;
  .item + .item {
    margin-left: var(--space);
  }
}
</style>
