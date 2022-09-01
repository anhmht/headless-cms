<template>
  <div :class="$style.root">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-main>
          <nuxt-child />
        </el-main>
      </el-container>
      <el-footer>Header</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {}
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
