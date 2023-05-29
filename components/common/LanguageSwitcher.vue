<template>
  <div :class="$style.root">
    <a
      href="#"
      v-for="locale in availableLocales"
      :key="locale.code"
      :class="active === locale.code && $style.active"
      @click="changeLocale(locale.code)"
      >{{ locale.name }}</a
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LanguageSwitcher',
  data() {
    return {
      active: 'vn'
    }
  },
  mounted() {
    this.active = (this as any).$i18n.locale
  },
  computed: {
    availableLocales(): Array<any> {
      return (this as any).$i18n.locales
    }
  },
  methods: {
    changeLocale(locale: string) {
      ;(this as any).$i18n.setLocale(locale)
      this.active = locale
    }
  }
})
</script>
<style lang="postcss" module>
.root {
  a + a {
    margin-left: var(--space-1o2);
  }
  .active {
    font-weight: bold;
  }
}
</style>
