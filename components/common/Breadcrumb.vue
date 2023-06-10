<template>
  <client-only>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">{{ $t('home') }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!isCategory" :to="category._path">{{
        $translate('title', category)
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </client-only>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    isCategory: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    categories() {
      return toRaw(this.$store.$state.categories)
    },
    category() {
      return this.categories.find((item) => item.id === this.categoryId)
    }
  }
}
</script>

<style></style>
