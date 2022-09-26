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
            <h1>LAW 4 YOU</h1>
          </nuxt-link>
        </div>
        <div :class="$style.search">
          <el-input
            placeholder="Tìm kiếm"
            prefix-icon="el-icon-search"
            v-model="search"
          >
          </el-input>
        </div>
      </div>
      <Navbar />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from '~/components/layout/header/Navbar.vue'
export default Vue.extend({
  components: { Navbar },
  data() {
    return {
      search: ''
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  position: sticky;
  top: -80px;
  z-index: var(--z-index-sticky-header);
  background: #fff;
  .wrapper {
    display: flex;
    padding: var(--space) 0;
    @media screen and (max-width: 1199px) {
      display: none;
    }
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
  .search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > div {
      width: 200px;
    }
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
