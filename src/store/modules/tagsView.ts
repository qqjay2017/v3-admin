import { RootState } from '@/store'
import { Module, MutationTree } from 'vuex'
import { LocationQuery, RouteMeta } from 'vue-router'

export interface RouteLocationWithFullPath {
  name: string|symbol;
  path: string;
  fullPath: string;
  meta: RouteMeta;
  query? :LocationQuery,
  children?:RouteLocationWithFullPath[]
}

export interface TagsViewState {
  visitedViews: RouteLocationWithFullPath[],
  cachedViews: Array<string|symbol>
}

export enum TagsViewModuleMutations {
  ADD_VISITED_VIEW='ADD_VISITED_VIEW',
  ADD_CACHE_VIEW='ADD_CACHE_VIEW',
  DEL_VISITED_VIEW='DEL_VISITED_VIEW',
  DEL_CACHED_VIEW='DEL_CACHED_VIEW',
  DEL_ALL_CACHED_VIEWS='DEL_ALL_CACHED_VIEWS',
}

const state:()=>TagsViewState = () => ({
  visitedViews: [],
  cachedViews: []
})

export type AppState = ReturnType<typeof state>

const mutations:MutationTree<AppState> = {
  [TagsViewModuleMutations.ADD_VISITED_VIEW] (state, view: RouteLocationWithFullPath) {
    if (state.visitedViews.some(v => v.path === view.path)) {

    } else {
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta?.title || 'tag-name'
      }))
    }
  },
  [TagsViewModuleMutations.ADD_CACHE_VIEW] (state, view: RouteLocationWithFullPath) {
    if (state.cachedViews.includes(view.name)) {

    } else if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  [TagsViewModuleMutations.DEL_VISITED_VIEW] (state, view:RouteLocationWithFullPath) {
    const i = state.visitedViews.indexOf(view)
    if (i > -1) {
      state.visitedViews.splice(i, 1)
    }
  },
  [TagsViewModuleMutations.DEL_CACHED_VIEW] (state, view:RouteLocationWithFullPath) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  [TagsViewModuleMutations.DEL_ALL_CACHED_VIEWS] (state) {
    state.cachedViews = []
  }

}

const tagsViewModule :Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations
}

export default tagsViewModule
