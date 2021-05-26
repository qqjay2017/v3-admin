import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

const NAME = 'tagsView'

@Module({ dynamic: true, namespaced: true, store, name: NAME })
export default class TagsViewModule extends VuexModule {
  visitedViews:RouteLocationNormalizedLoaded[] = []

  @Mutation
  ADD_VISITED_VIEW (view: RouteLocationNormalizedLoaded) :void{
    if (this.visitedViews.some(v => v.path === view.path)) {

    } else {
      this.visitedViews.push(Object.assign({}, view, {
        title: view.meta?.title || 'tag-name'
      }))
    }
  }

  @Mutation
  DEL_VISITED_VIEW (view:RouteLocationNormalizedLoaded):void{
    const i = this.visitedViews.indexOf(view)
    if (i > -1) {
      this.visitedViews.splice(i, 1)
    }
  }
}

export const tagsViewStore = getModule<TagsViewModule>(TagsViewModule)
