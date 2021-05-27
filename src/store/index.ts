import { createStore, DispatchOptions, Store, useStore as useVuexStore } from 'vuex'
import { InjectionKey } from 'vue'
import createPersistedState from 'vuex-persistedstate'
import appModule, { AppState } from '@/store/modules/app'
import tagsViewModule, { TagsViewState } from '@/store/modules/tagsView'

export enum Modules {
  App = 'app',
  TagsView = 'tagsView',
}

export interface IRootState {
  [Modules.App]: AppState;
  [Modules.TagsView]: TagsViewState;
}
// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用
export const storeKey: InjectionKey<Store<IRootState>> = Symbol('')

const myPlugin = createPersistedState({
  storage: window.localStorage,
  key: 'vuex_app',
  paths: ['app.sidebar.opened']

})
const createVuexStore = () => createStore<IRootState>({
  modules: {
    [Modules.App]: appModule,
    [Modules.TagsView]: tagsViewModule

  },
  plugins: [
    myPlugin
  ]
})

export type IRootStore = ReturnType<typeof createVuexStore>
export const useStore = () => useVuexStore<IRootState>(storeKey)

export const getNamespace = (moduleName: Modules, target: string) => {
  return `${moduleName}/${target}`
}

export default createVuexStore()
