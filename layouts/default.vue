<template>
  <div :class="$style.root">
    <transition name="fade">
      <div
        v-if="visible"
        :class="$style.overlay"
        @click="visible = !visible"
      ></div>
    </transition>
    <NavSideBar :class="visible ? $style.visibleSidebar : ''" />
    <div :class="visible ? $style.visibleSidebar : ''">
      <Header />
      <main>
        <nuxt-child />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Footer from '~/components/layout/footer/Footer.vue'
import Header from '~/components/layout/header/Header.vue'
import NavSideBar from '~/components/layout/header/NavSideBar.vue'
export default Vue.extend({
  components: { Header, Footer, NavSideBar },
  data() {
    return {
      visible: false
    }
  },
  created() {
    this.$nuxt.$on('openSidebar', () => {
      this.visible = !this.visible
    })
  }
})
</script>
<style lang="postcss" module>
.root {
  .visibleSidebar {
    transform: translate3d(320px, 0, 0);
  }
  .overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.15);
    -webkit-animation: fade 0.5s;
    animation: fade 0.5s;
    z-index: 1;
  }
  main {
    margin-top: var(--space-2x);
  }
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
