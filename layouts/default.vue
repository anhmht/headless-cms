<template>
  <div :class="[$style.root, visible && $style.overflow, 'page']">
    <PreLoading v-if="loading" />
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
    <div id="fb-root"></div>
    <div
      id="fb-customer-chat"
      class="fb-customerchat"
      page_id="388082838333792"
      attribution="biz_inbox"
    ></div>
  </div>
</template>

<script>
import Vue from 'vue'
import PreLoading from '~/components/common/PreLoading.vue'
import Footer from '~/components/layout/footer/Footer.vue'
import Header from '~/components/layout/header/Header.vue'
import NavSideBar from '~/components/layout/header/NavSideBar.vue'
import imagesloaded from 'imagesloaded'
import gsap from 'gsap'

export default Vue.extend({
  components: { Header, Footer, NavSideBar, PreLoading },
  middleware: ['categories'],
  data() {
    return {
      visible: false,
      loading: true
    }
  },
  created() {
    this.$nuxt.$on('openSidebar', () => {
      this.visible = !this.visible
    })
  },
  mounted() {
    const tl = gsap.timeline()
    const vm = this
    const imageLoad = imagesloaded(document.querySelector('.page'))
    imageLoad.on('done', () => {
      setTimeout(() => {
        tl.to('.main', {
          opacity: 0
        }).to('.blinder', {
          height: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out'
        })
      }, 1000)
      setTimeout(() => {
        vm.loading = false
      }, 4000)
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
  &.overflow {
    overflow: hidden;
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
