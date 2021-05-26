import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import createPersistedState from 'vuex-persistedstate'
export const storeKey: InjectionKey<Store<any>> = Symbol('')

// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用

const persisteAppState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app',
  paths: ['app.sidebar.opened']
})

const store = createStore({
  plugins: [
    persisteAppState
  ]

})
export default store
