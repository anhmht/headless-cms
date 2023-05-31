<template>
  <el-autocomplete
    v-model="search"
    :fetch-suggestions="querySearch"
    :placeholder="$t('search')"
    :trigger-on-focus="false"
    prefix-icon="el-icon-search"
    @select="handleSelect"
    :class="$style.searchInput"
  >
    <template slot-scope="{ item }">
      <div>{{ item.title }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      posts: [],
      search: ''
    }
  },
  methods: {
    async querySearch(queryString, cb) {
      if (!queryString) {
        this.posts = []
      }
      this.posts = await this.$content('post', this.$i18n.locale)
        .only(['title', 'slug'])
        .limit(12)
        .search(queryString)
        .fetch()

      cb(this.posts)
    },
    handleSelect(item) {
      this.$nuxt.$emit('openSidebar')
      this.$router.push(`/post/${item.slug}`)
    }
  }
})
</script>

<style lang="postcss" module>
.searchInput {
  width: 100%;
}
</style>
