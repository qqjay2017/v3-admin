import router from './router'
import { getAuthType, getToken, removeToken } from '@/utils/auth'
import store, { getNamespace, Modules } from '@/store'
import { UserModuleAction } from '@/store/modules/user'

const whiteList = ['/login', '/auth-redirect', '/login-gitee'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      try {
        const userId = store.state.user.userInfo.id
        if (userId === -1) {
          // 没有用户信息,去获取下
          const authType = getAuthType()
          if (authType === 'gitee') {
            await store.dispatch(getNamespace(Modules.User, UserModuleAction.giteeUserInfo), hasToken)
          }

          next()
        } else {
          next()
        }
      } catch {
        console.log('报错!!')
        removeToken()
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 去白名单
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
