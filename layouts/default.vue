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
    <SocialMedia v-if="!loading" />
    <NavSideBar :class="visible ? $style.visibleSidebar : ''" />
    <div v-show="displayContent" :class="visible ? $style.visibleSidebar : ''">
      <Header />
      <main><slot /></main>
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
import imagesloaded from 'imagesloaded'
import gsap from 'gsap'
import { sleep } from '~/utils'

export default {
  middleware: ['categories'],
  data() {
    return {
      visible: false,
      loading: true,
      displayContent: false
    }
  },
  created() {
    this.$eventBus.on('openSidebar', () => {
      this.visible = !this.visible
    })
  },
  mounted() {
    const tl = gsap.timeline()
    const vm = this
    document.querySelector('body').classList.add('overflow-hidden')
    const imageLoad = imagesloaded(document.querySelector('.page'))
    imageLoad.on('done', async () => {
      await sleep(1000)
      tl.to('.main', {
        opacity: 0
      }).to('.blinder', {
        height: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      })
      vm.displayContent = true
      await sleep(2500)
      vm.loading = false
      document.querySelector('body').classList.remove('overflow-hidden')
    })
  }
}
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
