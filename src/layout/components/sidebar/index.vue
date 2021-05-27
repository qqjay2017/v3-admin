<template>
  <div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="themeColor"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <SidebarItem
        v-for="i in menuRouters"
      :key="i.path"
       :item="i"
        :base-path="i.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
import { ElMenu } from 'element-plus'
import SidebarItem from '@/layout/components/sidebar/SidebarItem.vue'
import { routes } from '@/router'
import { useStore } from '@/store'
import useGetThemeColor from '@/hooks/useGetThemeColor'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
    ElMenu
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const activeMenu = computed(() => {
      const { path, meta } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    // scss变量
    const scssVariables = computed(() => variables)
    // 是否收起
    const isCollapse = computed(() => !store.state.app.sidebar.opened)
    const menuRouters = computed(() => routes)
    const themeColor = useGetThemeColor()
    return {
      isCollapse,
      scssVariables,
      activeMenu,
      menuRouters,
      themeColor
    }
  }
})
</script>

<style lang="postcss" scoped></style>
