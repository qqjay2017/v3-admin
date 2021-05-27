import { RootState } from '@/store'
import { Size } from '@/plugins/element'
import { Module, MutationTree } from 'vuex'
import variables from '@/styles/variables.scss'
export enum SettingsModuleMutations {
  CHANGE_SETTING='CHANGE_SETTING',
}

const state:()=>{
  theme: string;
  tagsView: boolean;
  originalStyle: string;
  sidebarLogo: boolean;
} = () => ({
  theme: variables.theme,
  tagsView: true,
  originalStyle: '',
  sidebarLogo: true
})

export type SettingsState = ReturnType<typeof state>

// 动态key的情况下 根据不同的key 约束对应value
// http://www.voidcn.com/article/p-wtmkdcie-byz.html
type ValueOf<T> = T[keyof T];
interface ISettings { // 约束payload类型
  key: keyof SettingsState; // 约束为ISettingsState中key
  value: ValueOf<SettingsState>; // 约束为ISettingsState中value的类型
}
const mutations:MutationTree<SettingsState> = {
  [SettingsModuleMutations.CHANGE_SETTING] (state, { key, value }: ISettings) {
    if (key in state) {
      (state[key] as ValueOf<SettingsState>) = value
    }
  }
}

const settingsModule :Module<SettingsState, RootState> = {
  namespaced: true,
  state,
  mutations
}

export default settingsModule
