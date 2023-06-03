<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.wrapper">
        <div :class="$style.logo">
          <nuxt-link to="/">
            <img src="/images/LAW_4_YOU-transparent.png" alt="logo" />
            <h1>LAW 4 YOU - Luật cho bạn</h1>
          </nuxt-link>
        </div>
        <div :class="$style.search">
          <SearchPost />
          <LanguageSwitcher />
        </div>
      </div>
      <Navbar />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import SearchPost from '~/components/common/SearchPost.vue'
import Navbar from '~/components/layout/header/Navbar.vue'
export default Vue.extend({
  components: { Navbar, LanguageSwitcher, SearchPost }
})
</script>
<style lang="postcss" module>
.root {
  position: sticky;
  top: -80px;
  z-index: var(--z-index-sticky-header);
  background-image: linear-gradient(
    240deg,
    #a0e9e5 0%,
    #fafdfe 20%,
    #f3f3f3 100%
  );
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 20px 4px;
  .wrapper {
    display: flex;
    padding: var(--space) 0;
    justify-content: space-between;
    @media screen and (max-width: 1199px) {
      display: none;
    }
  }
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    a {
      display: flex;
      align-items: center;
    }
    h1 {
      font-weight: normal;
      text-transform: uppercase;
    }
    img {
      margin-right: var(--space);
      width: 40px;
      height: 40px;
    }
  }
  .search {
    flex-basis: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space);
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
