<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <h1>LAW 4 YOU</h1>
      <i class="fa-solid fa-xmark" @click="$eventBus.emit('openSidebar')"></i>
    </div>
    <div :class="$style.search">
      <SearchPost mobile />
    </div>
    <div :class="$style.content">
      <div v-for="item in categories" :class="$style.item" :key="item.id">
        <a href="#" @click="handleClick(item)">{{
          $translate('title', item)
        }}</a>
      </div>
    </div>
    <div :class="$style.lang">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script>
import { useMainStore } from '~/store'
import { mapState } from 'pinia'
export default {
  computed: {
    ...mapState(useMainStore, ['categories'])
  },
  methods: {
    handleClick(item) {
      this.$eventBus.emit('openSidebar')
      this.$router.push(`/category/${item._slug}`)
    }
  }
}
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
