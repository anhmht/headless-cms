<template>
  <div :class="$style.root">
    <Header />
    <main>
      <nuxt-child />
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '~/components/layout/header/Header.vue'
export default Vue.extend({
  components: { Header }
})
</script>
<style lang="postcss" module>
.root {
  .hidden {
    display: none;
  }
  .backToTop {
    background: var(--color-secondary-text);
    font-size: 3rem;
    border: none;
    box-shadow: 1px 1px 6px #00000029;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
<style>
.container {
  padding: 0 var(--space);
  margin-right: auto;
  margin-left: auto;
}
</style>
