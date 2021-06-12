<template>
  <div class="sidebar-wrapper">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <ElScrollbar>
      <el-menu
        class="sidebar-container-menu"
        :class="{
          'sidebar-show-logo': showLogo
        }"
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
    </ElScrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
import SidebarItem from '@/layout/components/sidebar/SidebarItem.vue'
import { routes } from '@/router'
import { useStore } from '@/store'
import useGetThemeColor from '@/hooks/useGetThemeColor'
import Logo from '@/layout/components/Logo.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem
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
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const menuRouters = computed(() => routes)
    const themeColor = useGetThemeColor()
    return {
      isCollapse,
      scssVariables,
      activeMenu,
      menuRouters,
      themeColor,
      showLogo
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  .sidebar-container-menu {
    height: 100vh;
    &.sidebar-show-logo {
      height: calc(100vh - 50px);
    }
  }
}
</style>
