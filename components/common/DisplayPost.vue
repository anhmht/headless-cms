<template>
  <div :class="$style.root">
    <nuxt-link :to="post.path">
      <img :src="post.thumbnail" alt="aa" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {}
})
</script>
<style lang="postcss" module>
.root {
}
</style>
