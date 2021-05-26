import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { RouteMeta } from 'vue-router'
import { hotModuleUnregisterModule } from '@/store/hotModuleUnregisterModule'

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
  cachedViews:Array<string|symbol> = []

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
  ADD_CACHE_VIEW (view:RouteLocationWithFullPath):void {
    if (this.cachedViews.includes(view.name)) {

    } else if (!view.meta.noCache) {
      this.cachedViews.push(view.name)
    }
  }

  @Mutation
  DEL_VISITED_VIEW (view:RouteLocationWithFullPath):void{
    const i = this.visitedViews.indexOf(view)
    if (i > -1) {
      this.visitedViews.splice(i, 1)
    }
  }

  @Mutation
  DEL_CACHED_VIEW (view:RouteLocationWithFullPath):void {
    const index = this.cachedViews.indexOf(view.name)
    index > -1 && this.cachedViews.splice(index, 1)
  }

  @Mutation
  DEL_ALL_CACHED_VIEWS () {
    this.cachedViews = []
  }
}

export const tagsViewStore = getModule<TagsViewModule>(TagsViewModule)
