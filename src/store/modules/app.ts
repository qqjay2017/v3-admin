import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { Size } from '@/plugins/element'

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
    opened: true
  }

  size:Size = 'small'

  @Mutation
  toggleSidebar () {
    this.sidebar.opened = !this.sidebar.opened
  }

  @Mutation
  setSize (size:Size = 'small') {
    this.size = size
  }
}

export const appStore = getModule<MyModule>(MyModule)
