<template>
  <div class="app-wrapper" :class="comClassObj" >
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header fixed-header">
       <Navbar @showSetting="openSettings" />
        <TagsView v-if="showTagsView" />
      </div>
      <app-main />
    </div>
    <ElDrawer
    v-model="showSetting"
    title="样式风格设置"
    :size="SettingsPanelWidth"

    >
     <div>
      <Settings />
     </div>
    </ElDrawer>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Sidebar from '@/layout/components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from '@/layout/components/Navbar.vue'
import TagsView from '@/layout/components/TagsView/index.vue'
import { ElDrawer } from 'element-plus'
import { getNamespace, Modules, useStore } from '@/store'
import varibalse from '@/styles/variables.scss'
import Settings from '@/layout/components/Settings/index.vue'
import useResize from '@/layout/useResize'
import { AppModuleMutations } from '@/store/modules/app'

export default defineComponent({
  name: 'Layout',
  components: { Settings, TagsView, Navbar, Sidebar, AppMain, ElDrawer },
  setup () {
    const store = useStore()
    useResize()
    const showSetting = ref(false)
    // 是否显示tagsView
    const showTagsView = computed(() => store.state.settings.tagsView)
    const openSettings = () => {
      showSetting.value = true
    }
    const device = computed(() => store.state.app.device)
    const sidebar = computed(() => store.state.app.sidebar)

    const handleClickOutside = () => {
      store.commit(getNamespace(Modules.App, AppModuleMutations.closeSideBar),
        { withoutAnimation: false })
    }

    const comClassObj = computed(() => {
      return {
        hideSidebar: !store.state.app.sidebar.opened,
        openSidebar: store.state.app.sidebar.opened,
        withoutAnimation: store.state.app.sidebar.withoutAnimation,
        mobile: store.state.app.device === 'mobile'
      }
    })

    return {
      openSettings,
      showSetting,
      showTagsView,
      SettingsPanelWidth: varibalse.settingPaneWidth,
      device,
      sidebar,
      handleClickOutside,
      comClassObj
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.app-wrapper {

  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}
.mobile .fixed-header {
  width: 100%;
}
</style>
