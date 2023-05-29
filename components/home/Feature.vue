<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="post in posts" :key="post.id">
      <nuxt-link :to="`post/${post.slug}`">
        <img :src="post.thumbnail" alt="aa" />
        <div :class="$style.content">
          <DisplayCategory :id="post.category" />

          <h3>{{ post.title }}</h3>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
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
      posts: []
    }
  },
  async fetch() {
    this.posts = await (this as any)
      .$content('post', 'vn')
      .skip(this.skip)
      .limit(3)
      .fetch()
  },

  methods: {
    summary(summary: string): string {
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
