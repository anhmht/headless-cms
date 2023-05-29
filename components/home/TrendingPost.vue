<template>
  <div :class="$style.root">
    <div
      :class="`grid grid-cols-1 gap-x-6 xs:grid-cols-2 sm:grid-cols-4 ${
        isSideBar ? `lg:grid-cols-1` : `lg:grid-cols-4`
      } ${isSideBar ? `xl:gap-x-0` : ``}`"
    >
      <div
        :class="$style.item"
        v-for="(post, index) in newPosts"
        :key="post.id"
      >
        <div :class="$style.image">
          <img :src="posts[index].thumbnail" :alt="post.title" />
        </div>
        <div :class="$style.content">
          <DisplayCategory :id="posts[index].category" />
          <nuxt-link :to="`post/${post.slug}`">
            <h4>{{ post.title }}</h4></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DisplayCategory from '../common/DisplayCategory.vue'
export default Vue.extend({
  components: { DisplayCategory },
  props: {
    isSideBar: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      posts: [],
      postsLocale: []
    }
  },
  async fetch() {
    this.posts = await this.$content('post', 'vn').limit(this.limit).fetch()
    this.postsLocale = []
    this.posts.forEach(async (element) => {
      this.postsLocale.push(
        ...(await this.$content('post', this.$i18n.locale)
          .where({ slug: element.slug })
          .fetch())
      )
    })
  },
  computed: {
    newPosts() {
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
    display: flex;
    gap: var(--space);
    img {
      height: 100px;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    h4 {
      font-size: 1.2rem;
      margin-top: var(--space-1o2);
      color: #000;
    }
  }
  .image {
    width: 100px;
    min-width: 100px;
  }
  .item + .item {
    margin-top: var(--space);
  }
  @media only screen and (max-width: 992px) {
    .item {
      img {
        margin: auto;
      }
    }
  }
}
</style>
