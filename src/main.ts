import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { storeKey } from './store'
// 初始化css
import 'normalize.css/normalize.css'

import installElementPlus from './plugins/element'
// 全局 css
import '@/styles/index.scss'

// svg icons
import initSvgIcon from '@/icons/index'
import { appStore } from '@/store/modules/app'

const app = createApp(App)
const size = appStore.size

app
  .use(store, storeKey)
  .use(router)
  .use(installElementPlus, {
    size
  })
  .use(initSvgIcon)
  .mount('#app')
