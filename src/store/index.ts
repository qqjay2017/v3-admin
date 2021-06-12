import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { InjectionKey } from 'vue'
import createPersistedState from 'vuex-persistedstate'
import appModule, { AppState } from '@/store/modules/app'
import tagsViewModule, { TagsViewState } from '@/store/modules/tagsView'
import settingsModule, { SettingsState } from '@/store/modules/settings'
import userModule, { UserState } from '@/store/modules/user'
import { Size } from '@/plugins/element'

export enum Modules {
  App = 'app',
  TagsView = 'tagsView',
  Settings = 'settings',
  User = 'user'
}

export interface RootState {
  app: AppState;
  tagsView: TagsViewState;
  settings: SettingsState;
  user:UserState
}
// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用
export const storeKey: InjectionKey<Store<RootState>> = Symbol('')

const myPlugin = createPersistedState({
  storage: window.localStorage,
  key: 'vuex_app',
  paths: ['app.sidebar', 'app.opened', 'app.size', 'app.device']

})
const persisteSettingsState = createPersistedState({
  storage: window.localStorage, // 指定storage 也可自定义
  key: 'vuex_setting', // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖
  // paths: ['app'] // 针对app这个模块持久化
  // 只针对app模块下sidebar.opened状态持久化
  paths: ['settings'] // 通过点连接符指定state路径
})
const createVuexStore = () => createStore<RootState>({
  modules: {
    [Modules.App]: appModule,
    [Modules.TagsView]: tagsViewModule,
    [Modules.Settings]: settingsModule,
    [Modules.User]: userModule
  },
  plugins: [
    myPlugin,
    persisteSettingsState
  ]
})

export type IRootStore = ReturnType<typeof createVuexStore>
export function useStore () {
  return useVuexStore(storeKey)
}

export const getNamespace:(moduleName: Modules, target: string)=>string = (moduleName, target) => {
  return `${moduleName}/${target}`
}

export default createVuexStore()
