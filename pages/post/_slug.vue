<template>
  <div :class="[$style.root, 'container']">
    <div v-if="!$fetchState.pending">
      <img
        :class="$style.banner"
        :src="post.vn.thumbnail"
        :alt="post[$i18n.locale].title"
      />
      <Breadcrumb
        :categoryId="post.vn.category"
        :title="post[$i18n.locale].title"
      />
      <h1>{{ post[$i18n.locale].title }}</h1>
      <p>{{ post[$i18n.locale].summary }}</p>
      <nuxt-content :document="post[$i18n.locale]" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Breadcrumb from '~/components/common/Breadcrumb.vue'
export default Vue.extend({
  components: { Breadcrumb },
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
  },
  watch: {
    '$route.params.slug': '$fetch'
  }
})
</script>
<style lang="postcss" module>
.root {
  font-size: 1.5rem;
  .banner {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  img {
    margin: var(--space-2x) auto;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    margin: var(--space-3x) 0;
    color: #000;
  }
  h2 {
    font-size: 2rem;
    margin: var(--space-2x) 0;
  }
  p {
    margin: 4px 0;
  }
}
</style>
