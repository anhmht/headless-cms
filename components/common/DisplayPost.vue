<template>
  <div :class="$style.root">
    <nuxt-link :to="`post/${post.slug}`">
      <img :src="post.thumbnail" :alt="post.title" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {}
}
</script>
<style lang="postcss" module>
.root {
}
</style>
