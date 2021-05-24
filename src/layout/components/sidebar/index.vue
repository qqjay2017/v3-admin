<template>
  <div>
    <!-- 测试展开收起 -->
    <h5 @click="isCollapse=!isCollapse">展收测试</h5>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
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
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
import { ElMenu } from 'element-plus'
import SidebarItem from '@/layout/components/sidebar/SidebarItem.vue'
import { routes } from '@/router'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
    ElMenu
  },
  setup () {
    const route = useRoute()
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })

    // scss变量
    const scssVariables = computed(() => variables)
    // 是否收起
    const isCollapse = ref(false)
    const menuRouters = computed(() => routes)
    return {
      isCollapse,
      scssVariables,
      activeMenu,
      menuRouters
    }
  }
})
</script>

<style lang="postcss" scoped></style>
