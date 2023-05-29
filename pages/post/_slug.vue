<template>
  <div :class="[$style.root, 'container']">
    <div v-if="post.vn">
      <img :src="post.vn.thumbnail" :alt="post[$i18n.locale].title" />
      <h2>{{ post[$i18n.locale].title }}</h2>
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
          this.post[locale.code] = post
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
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  h2 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    margin: var(--space) 0;
    color: #000;
  }
}
</style>
