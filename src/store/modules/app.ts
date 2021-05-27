import { IRootState } from '@/store'
import { Size } from '@/plugins/element'
import { Module, MutationTree, Store } from 'vuex'

export enum AppModuleMutations {
  toggleSidebar='toggleSidebar',
  setSize='setSize'
}

const state = () => ({
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

const appModule :Module<AppState, IRootState> = {
  namespaced: true,
  state,
  mutations
}

export default appModule
