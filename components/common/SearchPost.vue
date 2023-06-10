<template>
  <client-only>
    <el-autocomplete
      v-model="search"
      :fetch-suggestions="querySearch"
      :placeholder="$t('search')"
      :trigger-on-focus="false"
      @select="handleSelect"
      :class="$style.searchInput"
    >
      <template #prefix>
        <i class="fa-solid fa-magnifying-glass"></i>
      </template>
      <template #default="{ item }">
        <div>{{ item.title }}</div>
      </template>
    </el-autocomplete>
  </client-only>
</template>

<script setup>
const props = defineProps({
  mobile: {
    type: Boolean,
    default: false
  }
})

const posts = ref([])
const search = ref('')

const vm = useNuxtApp()

const querySearch = async (queryString, cb) => {
  if (!queryString) {
    posts.value = []
  }
  posts.value = await queryContent('post', vm.$i18n.locale.value)
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

  cb(posts.value)
}

const handleSelect = (item) => {
  if (props.mobile) vm.$eventBus.emit('openSidebar')
  vm.$router.push(`/post/${item._slug}`)
}
</script>

<style lang="postcss" module>
.searchInput {
  width: 100%;
  :global(.el-input__prefix) {
    left: var(--space);
  }
}
</style>
