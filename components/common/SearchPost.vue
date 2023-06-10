<template>
  <client-only>
    <el-autocomplete
      v-model="search"
      :fetch-suggestions="querySearch"
      :placeholder="$t('search')"
      :trigger-on-focus="false"
      prefix-icon="el-icon-search"
      @select="handleSelect"
      :class="$style.searchInput"
    >
      <template v-slot="{ item }">
        <div>{{ item.title }}</div>
      </template>
    </el-autocomplete>
  </client-only>
</template>

<script>
export default {
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
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
      this.posts = await queryContent('post', this.$i18n.locale)
        .only(['title', '_slug'])
        .limit(12)
        .where({
          $or: [
            { title: { $regex: `/${queryString}/ig` } },
            { summary: { $regex: `/${queryString}/ig` } },
            { _full: { $regex: `/${queryString}/ig` } }
          ]
        })
        .find()

      cb(this.posts)
    },
    handleSelect(item) {
      if (this.mobile) this.$eventBus.emit('openSidebar')
      this.$router.push(`/post/${item._slug}`)
    }
  }
}
</script>

<style lang="postcss" module>
.searchInput {
  width: 100%;
}
</style>
