import { RootState } from '@/store'
import { Size } from '@/plugins/element'
import { Module, MutationTree } from 'vuex'

export enum AppModuleMutations {
  toggleSidebar='toggleSidebar',
  setSize='setSize',
  closeSideBar='closeSideBar',
  toggleDevice='toggleDevice',
}

const state:()=>{
  sidebar:{
    opened:boolean,
    withoutAnimation: boolean
  },
  size:Size,
  device:string
} = () => ({
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  size: 'default',
  device: 'desktop'
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
  }
}

const appModule :Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations
}

export default appModule
