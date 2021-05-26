import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
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
   someField = 'somedata'

  @MutationAction
   async updateSome () :Promise<{someField:any}> {
     const res = await wait()

     return {
       someField: res
     }
   }
}

export const appStore = getModule<MyModule>(MyModule)
