<template>
  <div :class="$style.root">
    <nuxt-link :to="category.path">
      {{ category.title }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '~/store/state'
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    categories(): any {
      return (this.$store.state as RootState).categories
    },
    category(): any {
      return this.categories.find((item: any) => item.id === this.id)
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  a {
    color: #000;
    font-size: 1rem;
  }
}
</style>
