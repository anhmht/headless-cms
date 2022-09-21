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

<script lang="ts">
import Vue from 'vue'
import { RootState } from '~/store/state'
export default Vue.extend({
  computed: {
    categories() {
      return (this.$store.state as RootState).categories
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  padding: var(--space) 0;
}
</style>
