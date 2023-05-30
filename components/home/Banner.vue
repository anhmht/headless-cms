<template>
  <div v-if="!$fetchState.pending" :class="$style.root">
    <el-carousel height="500px">
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="item.id"
        :class="$style.item"
      >
        <nuxt-link :to="`post/${item.slug}`">
          <img :src="posts[index].thumbnail" :alt="item.title" />
        </nuxt-link>

        <nuxt-link :class="$style.link" :to="`post/${item.slug}`">{{
          item.title
        }}</nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      posts: [],
      postsLocale: []
    }
  },
  async fetch() {
    this.posts = await this.$content('post', 'vn')
      .where({ isBanner: true })
      .fetch()
    this.postsLocale = []
    this.posts.forEach(async (element) => {
      this.postsLocale.push(
        ...(await this.$content(
          'post',
          this.$i18n.locale === 'vn' ? 'en' : this.$i18n.locale
        )
          .where({ slug: element.slug })
          .fetch())
      )
    })
  },
  computed: {
    banners() {
      return this.$i18n.locale === 'vn' ? this.posts : this.postsLocale
    }
  },
  watch: {
    '$i18n.locale': '$fetch'
  }
})
</script>
<style lang="postcss" module>
.root {
  .item {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      filter: brightness(0.8);
    }
    .link {
      position: absolute;
      bottom: var(--space-3x);
      left: var(--space-2x);
      font-size: 3rem;
      color: #fff;
    }
  }
}
</style>
