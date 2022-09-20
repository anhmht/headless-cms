<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.wrapper">
        <div :class="$style.social">
          <el-avatar size="small" src="/images/media/zalo.png"></el-avatar>
          <el-avatar size="small" src="/images/media/facebook.png"></el-avatar>
          <el-avatar
            size="small"
            src="/images/media/instagram.webp"
          ></el-avatar>
          <el-avatar size="small" src="/images/media/skype.png"></el-avatar>
          <el-avatar size="small" src="/images/media/telegram.png"></el-avatar>
        </div>
        <div :class="$style.logo">
          <nuxt-link to="/">
            <h1>HIEN LAWYER</h1>
          </nuxt-link>
        </div>
        <div :class="$style.search"></div>
      </div>
      <Navbar />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from '~/components/layout/header/Navbar.vue'
export default Vue.extend({
  components: { Navbar }
})
</script>
<style lang="postcss" module>
.root {
  padding: var(--space-2x) 0;
  .wrapper {
    display: flex;
    padding: var(--space) 0;
  }
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .social,
  .search {
    flex-basis: 30%;
  }

  .social {
    display: flex;
    align-items: center;
    span + span {
      margin-left: var(--space);
    }
  }
}
</style>
