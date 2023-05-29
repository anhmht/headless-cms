<template>
  <div :class="$style.root">
    <div
      :class="`grid grid-cols-1 gap-x-6 xs:grid-cols-2 sm:grid-cols-4 ${
        isSideBar ? `lg:grid-cols-1` : `lg:grid-cols-4`
      } ${isSideBar ? `xl:gap-x-0` : ``}`"
    >
      <div :class="$style.item" v-for="post in posts" :key="post.id">
        <div :class="$style.image">
          <img :src="post.thumbnail" :alt="post.title" />
        </div>
        <div :class="$style.content">
          <DisplayCategory :id="post.category" />
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
      posts: []
    }
  },
  async fetch() {
    this.posts = await this.$content('post', 'vn').limit(this.limit).fetch()
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
