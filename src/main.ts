import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { storeKey } from './store'

import './permission'

// 初始化css
import 'normalize.css/normalize.css'

import installElementPlus from './plugins/element'
// 全局 css
import '@/styles/index.scss'

// svg icons
import initSvgIcon from '@/icons/index'
// iconfont
import './icons/iconfont/iconfont.css'

// vue-particles
import Particles from 'particles.vue3'
import useGenerateTheme from '@/hooks/useGenerateTheme'

// i18n
import installI18n from './plugins/i18n'

async function bootstrap () {
  const app = createApp(App)

  app
    .use(store, storeKey)
    .use(router)
    .use(installElementPlus, {
      size: store.state.app.size
    })
    .use(installI18n)
    .use(initSvgIcon)
    .use(Particles)

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  useGenerateTheme(store)
  await router.isReady()

  app.mount('#app')
}

bootstrap().then()
