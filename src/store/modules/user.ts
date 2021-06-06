import { RootState } from '@/store'
import { ActionTree, Module, MutationTree } from 'vuex'
import { getAuthType, getToken, removeAuthType, removeToken, setAuthType, setToken } from '@/utils/auth'
import { getGiteeUserInfo } from '@/api/user/userInfo'

export enum UserModuleMutations {
  SET_TOKEN = 'SET_TOKEN',
  SET_AUTH_TYPE = 'SET_AUTH_TYPE',
  SET_USER_INFO = 'SET_USER_INFO',
}

export enum UserModuleAction {
  login = 'login',
  logout = 'logout',
  // 第三方登录
  otherLogin = 'otherLogin',
  giteeUserInfo = 'giteeUserInfo'
}

const state: () => {
  token: string | null,
  type: string | null,
  userInfo: {
    id: number,
    name: string,
    // eslint-disable-next-line camelcase
    avatar_url: string,

  }
} = () => ({
  token: getToken(),
  type: getAuthType(),
  userInfo: {
    id: -1,
    name: '',
    avatar_url: ''
  }
})

export type UserState = ReturnType<typeof state>

const mutations: MutationTree<UserState> = {
  [UserModuleMutations.SET_TOKEN] (state, token) {
    state.token = token
  },
  [UserModuleMutations.SET_AUTH_TYPE] (state, type) {
    state.type = type
  },
  [UserModuleMutations.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions: ActionTree<UserState, RootState> = {
  [UserModuleAction.login] ({ commit }, userInfo) {
    // 输入框里面的内容
    const { username, password } = userInfo
    return new Promise((resolve) => {
      const token = username + password
      commit(UserModuleMutations.SET_TOKEN, token)
      setToken(token)
      resolve(token)
    })
  },
  // user logout
  [UserModuleAction.logout] () {
    return new Promise((resolve) => {
      removeToken()
      removeAuthType()
      resolve('')
    })
  },
  [UserModuleAction.otherLogin] ({ commit }, { token, type }) {
    return new Promise((resolve) => {
      commit(UserModuleMutations.SET_TOKEN, token)
      setToken(token)
      commit(UserModuleMutations.SET_AUTH_TYPE, type)
      setAuthType(type)
      resolve(token)
    })
  },
  [UserModuleAction.giteeUserInfo] ({ commit }, token) {
    return new Promise((resolve, reject) => {
      getGiteeUserInfo(token).then(res => {
        const { id, name, avatar_url } = res.data

        commit(UserModuleMutations.SET_USER_INFO, {
          id: id,
          name: name,
          avatar_url: avatar_url
        })
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
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
