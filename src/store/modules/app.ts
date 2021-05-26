import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { Size } from '@/plugins/element'
import { hotModuleUnregisterModule } from '@/store/hotModuleUnregisterModule'

const NAME = 'app'
@Module({ dynamic: true, namespaced: true, store, name: NAME })
export default class MyModule extends VuexModule {
  sidebar = {
    opened: true
  }

  size:Size = 'small';
  @Mutation
  toggleSidebar ():void {
    this.sidebar.opened = !this.sidebar.opened
  }

  @Mutation
  setSize (size:Size = 'small'):void {
    this.size = size
  }
}
export const appStore = getModule<MyModule>(MyModule)
