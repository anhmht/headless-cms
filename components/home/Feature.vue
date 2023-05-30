<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="(post, index) in features" :key="post.id">
      <nuxt-link :to="`post/${post.slug}`">
        <img :src="posts[index].thumbnail" :alt="post.title" />
        <div :class="$style.content">
          <DisplayCategory :id="posts[index].category" :link="false" />
          <h3>{{ post.title }}</h3>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DisplayCategory from '~/components/common/DisplayCategory.vue'
export default Vue.extend({
  components: {
    DisplayCategory
  },
  props: {
    skip: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      posts: [],
      postsLocale: []
    }
  },
  async fetch() {
    this.posts = await this.$content('post', 'vn')
      .skip(this.skip)
      .limit(3)
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
    features() {
      return this.$i18n.locale === 'vn' ? this.posts : this.postsLocale
    }
  },
  watch: {
    '$i18n.locale': '$fetch'
  },
  methods: {
    summary(summary) {
      if (summary.length <= 250) {
        return summary
      }
      return `${summary.substring(0, 250)}...`
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  display: flex;
  gap: var(--space);
  .item {
    position: relative;
    height: 300px;
    flex: 1;
    img {
      object-fit: cover;
      height: 100%;
      filter: brightness(0.6);
    }
  }
  .content {
    position: absolute;
    bottom: 0;
    padding: var(--space);
    color: #fff;
    h3 {
      font-size: 1.5rem;
    }
  }
}
@media only screen and (max-width: 992px) {
  .root {
    flex-direction: column;
  }
}
</style>
