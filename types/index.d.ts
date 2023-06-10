import type { translate } from '~/plugins/data-helper'
import type { store } from '~/plugins/pinia'
import type { eventBus } from '~/plugins/event-bus'

interface PluginsInjections {
  $translate: ReturnType<typeof translate>,
  $store: ReturnType<typeof store>
  $eventBus: ReturnType<typeof eventBus>
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections { }
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections { }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections { }
}
