<template>
  <div :class="$style.root">
    <div :class="$style.mobileNav">
      <div :class="$style.item">
        <i
          :class="$style.icon"
          class="fa-solid fa-bars"
          @click="handleOpen"
          aria-hidden="true"
        ></i>
      </div>
      <div :class="$style.item" style="margin-left: 16px">
        <nuxt-link to="/"> LAW 4 YOU </nuxt-link>
      </div>
    </div>
    <div :class="$style.nav">
      <div :class="$style.item">
        <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
      </div>
      <div v-for="item in categories" :class="$style.item" :key="item.id">
        <nuxt-link :to="item._path">{{ $translate('title', item) }}</nuxt-link>
      </div>
      <div :class="$style.item">
        <nuxt-link to="/">{{ $t('contact') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.$state.categories
    }
  },
  methods: {
    handleOpen() {
      this.$eventBus.emit('openSidebar')
    }
  }
}
</script>
<style lang="postcss" module>
.root {
  .mobileNav {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding: var(--space) 0;
    display: none;
    @media only screen and (max-width: 1199px) {
      display: flex;
    }
  }
  .nav {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    padding: var(--space-2x) 0;
    @media only screen and (max-width: 1199px) {
      display: none;
    }
  }
  .item {
    a {
      color: #000;
    }
  }
  .icon {
    color: #000;
    font-size: 1.4rem;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
