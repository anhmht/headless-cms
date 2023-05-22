<template>
  <div :class="$style.root">
    <div
      :class="`grid grid-cols-1 gap-x-6 xs:grid-cols-2 sm:grid-cols-4 ${
        isSideBar ? `lg:grid-cols-1` : `lg:grid-cols-4`
      } ${isSideBar ? `xl:gap-x-0` : ``}`"
    >
      <div :class="$style.item" v-for="post in posts" :key="post.id">
        <el-row :gutter="16">
          <el-col :md="11"> <img :src="post.thumbnail" alt="" /></el-col>
          <el-col :md="13">
            <div :class="$style.content">
              <h4>{{ post.title }}</h4>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
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
    padding-bottom: var(--space);
    padding-right: var(--space);
    img {
      height: 100px;
      width: 100px;
      object-fit: cover;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    h4 {
      font-size: 1.2rem;
    }
  }
  @media only screen and (max-width: 992px) {
    .item {
      img {
        margin: auto;
      }
      h4 {
        text-align: center;
      }
    }
  }
}
</style>
