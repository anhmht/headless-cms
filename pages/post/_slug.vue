<template>
  <div :class="[$style.root, 'container']">
    <div v-if="!$fetchState.pending">
      <img :src="post.vn.thumbnail" :alt="post[$i18n.locale].title" />
      <h1>{{ post[$i18n.locale].title }}</h1>
      <nuxt-content :document="post[$i18n.locale]" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      post: {}
    }
  },
  async fetch() {
    try {
      this.availableLocales.forEach(async (locale) => {
        const post = await this.$content(
          'post',
          locale.code,
          this.$route.params.slug
        ).fetch()
        if (post) {
          this.post = { ...this.post, [locale.code]: post }
        }
      })
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  font-size: 1.5rem;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  h1 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    margin: var(--space) 0;
    color: #000;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    margin: 4px 0;
  }
}
</style>
