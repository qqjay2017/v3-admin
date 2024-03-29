<template>
  <div v-if="!item.meta || !item.meta.hidden"
       class="sidebar-item-container">
    <!--  只渲染一个路由 并且路由只有一个子路由时直接渲染这个子路由  -->

    <template v-if="theOnlyOneChildRoute && isRenderSingleRoute">
      <SidebarItemLink
        v-if="theOnlyOneChildRoute && theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :style="{padding: '0 14px'}" :index="resolvePath(theOnlyOneChildRoute.path)">
          <i  v-if="icon && icon.includes('el-icon')" :class="icon"></i>
          <svg-icon  v-else-if="icon" class="menu-icon" :icon-class="icon"></svg-icon>
          <template  #title>
            <span>{{ titleTransform(theOnlyOneChildRoute.meta.title) }}</span>
          </template>
        </el-menu-item>
      </SidebarItemLink>

    </template>
    <!-- 多个子路由时 递归el-submenu-->
    <el-submenu
    v-else
    :index="resolvePath(item.path)"
    popper-append-to-body
    >
      <template #title>
        <svg-icon
          v-if="item.meta.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span class="submenu-title">{{  titleTransform(item.meta.title) }}</span>
      </template>

      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></SidebarItem>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import path from 'path'
import SidebarItemLink from '@/layout/components/sidebar/SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink

  },
  props: {
    item: { // 当前路由（此时的父路由）
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: { // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true
    }
  },
  setup (props) {
    const { t } = useI18n()
    const { item } = toRefs(props)
    //  子路需要渲染的,排除hidden的
    const showingChild = computed(() => {
      return (item.value.children || []).filter((child) => !(child.meta && child.meta.hidden))
    })
    // 子路由数量
    const showingChildNumber = computed(() => {
      return showingChild.value.length
    })

    const noShowingChildren = computed(() => showingChildNumber.value === 0)

    //  要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
    const theOnlyOneChildRoute = computed(() => {
      // 多个children时 直接return null ,就不走单路由模式了,需要用el-submenu来渲染并递归
      if (showingChildNumber.value > 1) {
        return null
      }
      if (showingChildNumber.value === 1) {
        const oneChild = showingChild.value[0]

        return {
          ...oneChild,
          component: {}
        }
      }
      //  // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染children时 把当前路由item作为仅有的子路由渲染

      return {
        ...props.item,
        path: '',
        component: {},
        noShowingChildren: true // 无可渲染children
      }
    })

    const icon = computed(() => {
      return (theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon)) as string
    })

    // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
    // resolvePath在模板中使用
    const resolvePath = (childPath: string) => {
      // 如果是带协议外链 直接返回
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(props.basePath, childPath)
    }

    // 强制走menu item
    const alwaysShowRootMenu = computed(() => {
      return item.value.meta && item.value.meta.alwaysShow
    })
    // 是否只有一条可渲染路由(没有children,走不了menu item)
    const isRenderSingleRoute = computed(() => {
      return !alwaysShowRootMenu.value && (!theOnlyOneChildRoute?.value?.children || noShowingChildren.value)
    })

    const titleTransform = (title:string) => {
      return title.indexOf('.') > 0 ? t(title) : title
    }

    return {
      t,
      theOnlyOneChildRoute,
      icon,
      resolvePath,
      isRenderSingleRoute,
      titleTransform
    }
  }
})
</script>

<style lang="scss" >
.sidebar-item-container {
  .menu-icon {
    margin-right: 4px;
    width: 24px!important;
    vertical-align: middle;
  }
}
</style>
