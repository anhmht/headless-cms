<template>
  <div class="container">
    <div :class="$style.header">
      <h2>{{ $translate('title', category) }}</h2>
    </div>
    <div :class="$style.feature">
      <div
        :class="$style.item"
        v-for="(post, index) in displayFeatures"
        :key="post.id"
      >
        <nuxt-link :to="`/post/${post.slug}`">
          <img :src="posts[index].thumbnail" :alt="post.title" />
        </nuxt-link>
        <DisplayCategory :id="posts[index].category" />
        <nuxt-link :to="`/post/${post.slug}`"
          ><h3>{{ post.title }}</h3></nuxt-link
        >
        <p>{{ summary(post.summary) }}</p>
      </div>
    </div>
    <div :class="$style.main">
      <div
        :class="$style.posts"
        v-for="(post, index) in displayPosts"
        :key="post.id"
      >
        <nuxt-link :to="`/post/${post.slug}`">
          <img :src="posts[index + 3].thumbnail" :alt="post.title" />
        </nuxt-link>
        <div>
          <DisplayCategory :id="posts[index].category" />
          <nuxt-link :to="`/post/${post.slug}`"
            ><h3>{{ post.title }}</h3></nuxt-link
          >
          <p>{{ summary(post.summary, 250) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DisplayCategory from '~/components/common/DisplayCategory.vue'
export default Vue.extend({
  components: { DisplayCategory },
  data() {
    return {
      posts: [],
      postsLocale: []
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    category() {
      return this.categories.find(
        (item) => item.slug === this.$route.params.slug
      )
    },
    displayFeatures() {
      return this.$i18n.locale === 'vn'
        ? this.posts.slice(0, 3)
        : this.postsLocale.slice(0, 3)
    },
    displayPosts() {
      return this.$i18n.locale === 'vn'
        ? this.posts.slice(3)
        : this.postsLocale.slice(3)
    }
  },
  async fetch() {
    this.posts = await this.$content('post', 'vn')
      .where({ category: this.category.id })
      .fetch()
    this.postsLocale = []
    this.posts.forEach(async (element) => {
      this.postsLocale.push(
        ...(await this.$content('post', this.$i18n.locale)
          .where({ slug: element.slug })
          .fetch())
      )
    })
  },
  watch: {
    '$route.params.slug': '$fetch',
    '$i18n.locale': '$fetch'
  },
  methods: {
    summary(summary, length = 250) {
      if (summary.length <= length) {
        return summary
      }
      return `${summary.substring(0, length)}...`
    }
  }
})
</script>
<style lang="postcss" module>
.header {
  margin: 2rem 0;
  color: #000;
  text-align: center;
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
}
.feature {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2x);
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin-bottom: var(--space);
  }
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    margin: var(--space) 0;
  }
  p {
  }
}
.item {
  flex: 1;
}
.main {
  margin-top: var(--space-4x);
}
.posts {
  display: flex;
  gap: var(--space-2x);
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: var(--space) 0;
    color: #000;
  }
  img {
    height: 250px;
    object-fit: cover;
    margin-bottom: var(--space);
  }
}
.posts + .posts {
  margin-top: var(--space-2x);
}
@media only screen and (max-width: 992px) {
  .feature {
    flex-direction: column;
    gap: var(--space-4x);
  }
  .posts {
    gap: var(--space);
    h3 {
      margin: var(--space-1o2) 0;
    }
    img {
      height: 150px;
      min-width: 150px;
      margin-bottom: 0;
    }
  }
}
</style>
