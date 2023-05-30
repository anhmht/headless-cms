<template>
  <div :class="$style.root">
    <nuxt-link v-if="link" :to="category.path">
      {{ $translate('title', category) }}
    </nuxt-link>
    <div v-else>{{ $translate('title', category) }}</div>
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
    },
    link: {
      type: Boolean,
      default: true
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
  font-size: 1rem;
  a {
    font-size: 1rem;
  }
}
</style>
