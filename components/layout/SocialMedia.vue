<template>
  <ul :class="$style.root">
    <li :class="[$style.item, $style.facebook]">
      <a
        href="https://www.facebook.com/profile.php?id=100064108086338"
        target="_blank"
      >
        <img src="~/static/images/media/facebook-logo.png" alt="logo" />
      </a>
    </li>
    <li :class="[$style.item, $style.instagram]">
      <nuxt-link to="/">
        <img src="~/static/images/media/instagram-logo.png" alt="logo" />
      </nuxt-link>
    </li>
    <li :class="[$style.item, $style.zalo]">
      <nuxt-link to="/">
        <img src="~/static/images/media/zalo-logo.png" alt="logo" />
      </nuxt-link>
    </li>
    <li :class="[$style.item, $style.whatsapp]">
      <nuxt-link to="/">
        <img src="~/static/images/media/whatsapp-logo.png" alt="logo" />
      </nuxt-link>
    </li>
    <li :class="[$style.item, $style.skype]">
      <nuxt-link to="/">
        <img src="~/static/images/media/skype-logo.png" alt="logo" />
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="postcss" module>
.root {
  position: fixed;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  a:hover {
    opacity: 1;
  }
  .item {
    width: 80px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 13px;
    &:hover {
      transform: translateX(10px);
    }
    img {
      width: 5rem;
      height: 5rem;
    }
    &.facebook {
      padding-right: 0;
      background: #3b5998;
    }
    &.instagram {
      img {
        width: 3rem;
        height: 3rem;
        margin: auto;
      }
      background: #e1306c;
    }
    &.zalo {
      padding-right: 0;
      background: #038fe4;
    }
    &.whatsapp {
      img {
        width: 3rem;
        height: 3rem;
        margin: auto;
      }
      background: #11990b;
    }
    &.skype {
      background: #00aff0;
      img {
        width: 3rem;
        height: 3rem;
        margin: auto;
      }
    }
  }
}
</style>
