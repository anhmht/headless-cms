<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.footer">
        <div :class="$style.title">
          <h1>LAW 4 YOU</h1>
        </div>
        <div :class="$style.category">
          <div v-for="item in categories" :key="item.id" :class="$style.item">
            <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
          </div>
        </div>
        <div :class="$style.copyright">
          <p>© 2020 Law 4 you. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '~/store/state'
export default Vue.extend({
  computed: {
    categories(): any {
      return (this.$store.state as RootState).categories
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  background-color: #f7f7f7;
  margin-top: var(--space-4x);
  padding: var(--space-2x) 0;
  .title {
    h1 {
      text-align: center;
    }
  }
  .category {
    margin-top: var(--space-2x);
    flex: 1;
    margin-left: var(--space-1x5);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    a {
      color: #000;
    }
    div {
      padding: var(--space);
    }
  }
  .copyright {
    margin-top: var(--space-2x);
    padding: var(--space) 0;
    border-top: 1px solid #eeeeee;
  }
}
</style>
