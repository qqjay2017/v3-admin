import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import createPersistedState from 'vuex-persistedstate'

export const storeKey: InjectionKey<Store<any>> = Symbol('')

// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用

const myPlugin = createPersistedState({
  storage: window.localStorage,
  key: 'vuex_app',
  paths: ['app.sidebar.opened']

})

const store:Store<any> = createStore({
  plugins: [
    myPlugin
  ]

})
export default store
