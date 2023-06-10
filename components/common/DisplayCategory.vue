<template>
  <client-only>
    <div :class="$style.root">
      <nuxt-link v-if="link" :to="category._path">
        {{ $translate('title', category) }}
      </nuxt-link>
      <div v-else>{{ $translate('title', category) }}</div>
    </div>
  </client-only>
</template>

<script lang="ts">
export default {
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
      return toRaw(this.$store.$state.categories)
    },
    category(): any {
      return this.categories.find((item: any) => item.id === this.id)
    }
  }
}
</script>
<style lang="postcss" module>
.root {
  font-size: 1rem;
  a {
    font-size: 1rem;
  }
}
</style>
