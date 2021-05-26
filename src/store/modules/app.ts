import { getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

const NAME = 'app'

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random())
    }, 1000)
  })
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
export default class MyModule extends VuexModule {
  sidebar = {
    opened: JSON.parse(window.sessionStorage.getItem('vuex_app') || '{ app: { sidebar: { opened: true } } }').app.sidebar.opened
  }

  // @MutationAction
  //  async updateSome () :Promise<{someField:any}> {
  //    const res = await wait()
  //
  //    return {
  //      someField: res
  //    }
  //  }

  @Mutation
  toggleSidebar () {
    this.sidebar.opened = !this.sidebar.opened
  }
}

export const appStore = getModule<MyModule>(MyModule)
