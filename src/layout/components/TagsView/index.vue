<template>
  <div class="tags-view-container">
    <ElScrollbar ref="ElScrollbarRef" class="scroll-container tags-view-wrapper">
        <router-link
          class="tags-view-item"
          :class="{
          active: isActive(tag)
        }"
          v-for="(tag, index) in visitedTags"
          :key="index"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          :style="{
            backgroundColor:isActive(tag) ? themeColor:'',
            borderColor:isActive(tag) ? themeColor:'',
          }"
        >
          {{ tag.meta.title }}
          <span
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          ></span>
        </router-link>
    </ElScrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { RouteLocationWithFullPath, TagsViewModuleMutations } from '@/store/modules/tagsView'
import { routes } from '@/router'
import path from 'path'

import { getNamespace, Modules, useStore } from '@/store'
import useGetThemeColor from '@/hooks/useGetThemeColor'
import { ElScrollbar } from 'element-plus'

export default defineComponent({
  name: 'TagsView',
  components: { ElScrollbar },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const visitedTags = computed(() => store.state.tagsView.visitedViews)
    // 从路由表中过滤出要affixed tagviews

    const filterAffixTags = (routes: Array<RouteLocationWithFullPath | RouteRecordRaw>, basePath = '/') => {
      let tags: RouteLocationWithFullPath[] = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix && route.name) {
          // 把路由路径解析成完整路径，路由可能是相对路径
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            name: route.name,
            path: tagPath,
            fullPath: tagPath,
            meta: { ...route.meta }
          })
        }

        // 深度优先遍历 子路由（子路由路径可能相对于route.path父路由路径）
        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length) {
            tags = [...tags, ...childTags]
          }
        }
      })
      return tags
    }
    // 添加tag
    const addTags = () => {
      const { name } = route

      if (name) {
        store.commit(getNamespace(Modules.TagsView, TagsViewModuleMutations.ADD_VISITED_VIEW), {
          name: name,
          path: route.path,
          fullPath: route.fullPath,
          meta: route.meta
        })
      }
    }

    // 初始添加affix的tag
    const initTags = () => {
      const affixTags = filterAffixTags(routes)
      for (const tag of affixTags) {
        store.commit(getNamespace(Modules.TagsView, TagsViewModuleMutations.ADD_VISITED_VIEW), tag)
      }
    }

    // 路径发生变化追加tags view
    watch(() => route.path, () => {
      addTags()
    })

    // 最近当前router到tags view
    onMounted(() => {
      initTags()
      addTags()
    })

    // 是否是当前应该激活的tag
    const isActive = (tag: RouteLocationWithFullPath) => {
      return tag.path === route.path
    }

    const toLastView = (visitedViews: RouteLocationWithFullPath[], view: RouteLocationWithFullPath) => {
      const lastView = visitedViews[visitedViews.length - 1]
      if (lastView) {
        router.push(lastView.fullPath)
      } else {
        if (view.name === 'Dashboard') {
          router.replace({ path: '/redirect' + view.fullPath as string })
        } else {
          // tag都没有了 删除的也不是Dashboard 只能跳转首页
          router.push('/')
        }
      }
    }

    // 关闭当前右键的tag路由
    const closeSelectedTag = (view: RouteLocationWithFullPath) => {
      store.commit(getNamespace(Modules.TagsView, TagsViewModuleMutations.DEL_VISITED_VIEW), view)
      store.commit(getNamespace(Modules.TagsView, TagsViewModuleMutations.DEL_CACHED_VIEW), view)

      if (isActive(view)) {
        toLastView(visitedTags.value, view)
      }
    }

    // 是否是始终固定在tagsview上的tag
    const isAffix = (tag: RouteLocationWithFullPath) => {
      return tag.meta && tag.meta.affix
    }
    // 获取主题色
    const themeColor = useGetThemeColor()

    const ElScrollbarRef = ref()

    watch(() => visitedTags.value.length, () => {
      ElScrollbarRef.value && ElScrollbarRef.value.update && ElScrollbarRef.value.update()
    })
    return {
      visitedTags,
      isActive,
      closeSelectedTag,
      isAffix,
      themeColor,
      ElScrollbarRef
    }
  }
})
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
.tags-view-container {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }

}
</style>
