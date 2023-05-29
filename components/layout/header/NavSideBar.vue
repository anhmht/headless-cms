<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <h1>LAW 4 YOU</h1>
      <i class="fa-solid fa-xmark" @click="$nuxt.$emit('openSidebar')"></i>
    </div>
    <div :class="$style.search">
      <el-input
        :placeholder="$t('search')"
        prefix-icon="el-icon-search"
        v-model="search"
      >
      </el-input>
    </div>
    <div :class="$style.content">
      <div v-for="item in categories" :class="$style.item" :key="item.id">
        <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
      </div>
    </div>
    <div :class="$style.lang">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import { RootState } from '~/store/state'
export default Vue.extend({
  components: { LanguageSwitcher },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    categories() {
      return (this.$store.state as RootState).categories
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  overflow: hidden;
  position: fixed;
  height: 100%;
  top: 0;
  left: -320px;
  width: 320px;
  background: #fff;
  display: flex;
  flex-direction: column;
  z-index: 100;
  transform: translate3d(0, 0, 0);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space);
    border-bottom: 1px solid #eeeeee;
    i {
      cursor: pointer;
      font-size: 1.5rem;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .content {
    padding: 0 var(--space);
  }
  .lang {
    padding: var(--space);
    position: fixed;
    bottom: 0;
  }
  .search {
    padding: var(--space-1x5) var(--space);
  }
  .item {
    padding: var(--space-1o2) 0;
  }
}
</style>
