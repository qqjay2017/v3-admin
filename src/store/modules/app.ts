import { RootState } from '@/store'
import { Size } from '@/plugins/element'
import { Module, MutationTree } from 'vuex'
import { getLocale, setLanguage } from '@/locales'

export enum AppModuleMutations {
  toggleSidebar='toggleSidebar',
  setSize='setSize',
  closeSideBar='closeSideBar',
  toggleDevice='toggleDevice',
  setLanguage='setLanguage',
}

const state:()=>{
  sidebar:{
    opened:boolean,
    withoutAnimation: boolean
  },
  size:Size,
  device:string,
  language:string
} = () => ({
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  size: 'default',
  device: 'desktop',
  language: getLocale()
})

export type AppState = ReturnType<typeof state>

const mutations:MutationTree<AppState> = {
  [AppModuleMutations.toggleSidebar] (state) {
    state.sidebar.withoutAnimation = false
    state.sidebar.opened = !state.sidebar.opened
  },
  [AppModuleMutations.closeSideBar] (state, { withoutAnimation }) {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [AppModuleMutations.setSize] (state, size: Size = 'small') {
    state.size = size
  },
  [AppModuleMutations.toggleDevice] (state, device) {
    state.device = device
  },
  [AppModuleMutations.setLanguage] (state, language:string) {
    state.language = language
    setLanguage(language)
  }
}

const appModule :Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations
}

export default appModule
