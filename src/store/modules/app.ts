import { RootState } from '@/store'
import { Size } from '@/plugins/element'
import { Module, MutationTree } from 'vuex'

export enum AppModuleMutations {
  toggleSidebar='toggleSidebar',
  setSize='setSize'
}

const state:()=>{
  sidebar:{
    opened:boolean
  },
  size:Size
} = () => ({
  sidebar: {
    opened: true
  },
  size: 'default'
})

export type AppState = ReturnType<typeof state>

const mutations:MutationTree<AppState> = {
  [AppModuleMutations.toggleSidebar] (state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  [AppModuleMutations.setSize] (state, size: Size = 'small') {
    state.size = size
  }
}

const appModule :Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations
}

export default appModule
