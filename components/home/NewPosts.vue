<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="(post, index) in newPosts" :key="post.id">
      <el-row :gutter="16">
        <el-col :sm="12">
          <nuxt-link :to="`post/${post.slug}`">
            <img :src="posts[index].thumbnail" alt="aa" />
          </nuxt-link>
        </el-col>
        <el-col :sm="12">
          <div :class="$style.content">
            <DisplayCategory :id="posts[index].category" />
            <nuxt-link :to="`post/${post.slug}`">
              <h1>{{ post.title }}</h1>
            </nuxt-link>

            <p>{{ summary(post.summary) }}</p>
            <nuxt-link :to="`post/${post.slug}`">{{ $t('more') }}</nuxt-link>
          </div>
        </el-col>
      </el-row>
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
  .item {
    padding-bottom: var(--space-2x);
    h1 {
      margin-top: var(--space);
    }
    img {
      height: 280px;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    p {
      font-size: 1.2rem;
      padding: var(--space) 0;
    }
  }
  .item + .item {
    padding-top: var(--space-2x);
    border-top: 1px solid #eeeeee;
  }
}
</style>
