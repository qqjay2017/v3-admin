import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { RouteMeta } from 'vue-router'

export interface RouteLocationWithFullPath {
  name: string|symbol;
  path: string;
  fullPath: string;
  meta: RouteMeta;
  children?:RouteLocationWithFullPath[]
}

const NAME = 'tagsView'

@Module({ dynamic: true, namespaced: true, store, name: NAME })
export default class TagsViewModule extends VuexModule {
  visitedViews:RouteLocationWithFullPath[] = []

  @Mutation
  ADD_VISITED_VIEW (view: RouteLocationWithFullPath) :void{
    if (this.visitedViews.some(v => v.path === view.path)) {

    } else {
      this.visitedViews.push(Object.assign({}, view, {
        title: view.meta?.title || 'tag-name'
      }))
    }
  }

  @Mutation
  DEL_VISITED_VIEW (view:RouteLocationWithFullPath):void{
    const i = this.visitedViews.indexOf(view)
    if (i > -1) {
      this.visitedViews.splice(i, 1)
    }
  }
}

export const tagsViewStore = getModule<TagsViewModule>(TagsViewModule)
