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

const app = createApp(App)

app
  .use(store, storeKey)
  .use(router)
  .use(installElementPlus, {
    size: store.state.app.size
  })
  .use(initSvgIcon)
  .mount('#app')
