<template>
  <div v-if="!item.meta || !item.meta.hidden"
       class="sidebar-item-container">
    <!-- 一个路由下只有一个子路由的时候 只渲染这个子路由 -->

    <template v-if="theOnlyOneChildRoute && (!theOnlyOneChildRoute.children || theOnlyOneChildRoute.noShowingChildren)">
      <SidebarItemLink
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <svg-icon  v-if="icon" class="menu-icon" :icon-class="icon"></svg-icon>
          <template  #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </SidebarItemLink>

    </template>
    <!-- 多个子路由时 -->
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
        <span class="submenu-title">{{ item.meta.title }}</span>
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
import { ElMenuItem, ElSubmenu } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'
import path from 'path'
import SidebarItemLink from '@/layout/components/sidebar/SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink,
    ElMenuItem,
    ElSubmenu
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
    const { item } = toRefs(props)
    // // 子路由数量
    const showingChildNumber = computed(() => {
      const children = (item.value.children || []).filter((child) => {
        if (child.meta && child.meta.hidden) {
          return false
        }
        return true
      })
      return children.length
    })
    //  // 要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
    const theOnlyOneChildRoute = computed<RouteRecordRaw | null >(() => {
      // 多个children时 直接return null 多children需要用el-submenu来渲染并递归
      if (showingChildNumber.value > 1) {
        return null
      }
      // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
      // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child as RouteRecordRaw
          }
        }
      }
      //  // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染children时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '',
        noShowingChildren: true // 无可渲染children
      }
    })

    const icon = computed(() => {
      return theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon)
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
    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath
    }
  }
})
</script>

<style lang="scss" >
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
