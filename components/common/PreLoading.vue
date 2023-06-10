<template>
  <div :class="$style.root">
    <div :class="$style.wrapper">
      <div :class="$style.container">
        <div :class="[$style.blinder, 'blinder']"></div>
        <div :class="[$style.blinder, 'blinder']"></div>
        <div :class="[$style.blinder, 'blinder']"></div>
        <div :class="[$style.blinder, 'blinder']"></div>
        <div :class="[$style.blinder, 'blinder']"></div>
      </div>
      <div :class="[$style.main, 'main']">
        <img src="/images/LAW_4_YOU-transparent.png" alt="logo" />
        <h1 id="my-text">LAW 4 YOU</h1>
      </div>
    </div>
  </div>
</template>

<script>
import SplitType from 'split-type'
import gsap from 'gsap'
export default {
  mounted() {
    const text = new SplitType('#my-text')
    gsap.to('.char', {
      opacity: 1,
      stagger: 0.1,
      delay: 0.2,
      repeatDelay: 0.5,
      repeat: -1,
      yoyo: true
    })
  }
}
</script>

<style lang="postcss" module>
.root {
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 9999;
  .wrapper {
    position: relative;
    height: 100vh;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    .blinder {
      background: var(--color-primary);
      flex: 1;
      transform-origin: top;
      height: 100vh;
    }
  }
  .main {
    height: 100%;
    position: relative;
    img {
      position: absolute;
      width: 300px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
    }
    h1 {
      position: absolute;
      font-size: 100px;
      width: 100%;
      text-align: center;
      font-weight: 900;
      color: #fff;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
}
</style>
<style>
.char {
  opacity: 0;
}
</style>
