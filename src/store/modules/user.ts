import { getNamespace, Modules, RootState } from '@/store'
import { ActionTree, Module, MutationTree } from 'vuex'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { TagsViewModuleMutations } from '@/store/modules/tagsView'

export enum UserModuleMutations {
  SET_TOKEN = 'SET_TOKEN'
}

export enum UserModuleAction {
  login = 'login',
  logout = 'logout'
}

const state: () => {
  token: string | null
} = () => ({
  token: getToken()
})

export type UserState = ReturnType<typeof state>

const mutations: MutationTree<UserState> = {
  [UserModuleMutations.SET_TOKEN] (state, token) {
    state.token = token
  }
}

const actions: ActionTree<UserState, RootState> = {
  [UserModuleAction.login] ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const token = username + password
      commit(UserModuleMutations.SET_TOKEN, token)
      setToken(token)
      resolve(token)
    })
  },
  // user logout
  [UserModuleAction.logout] ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resolve('')
    })
  }

}

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default userModule
