<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
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
      <ThemePicker />
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
import ThemePicker from '@/components/ThemePicker/index.vue'
import { useStore } from '@/store'
import varibalse from '@/styles/variables.scss'
export default defineComponent({
  name: 'Layout',
  components: { ThemePicker, TagsView, Navbar, Sidebar, AppMain, ElDrawer },
  setup () {
    const store = useStore()

    const showSetting = ref(false)
    // 是否显示tagsView
    const showTagsView = computed(() => store.state.settings.tagsView)
    const openSettings = () => {
      showSetting.value = true
    }
    return {
      openSettings,
      showSetting,
      showTagsView,
      SettingsPanelWidth: varibalse.settingPaneWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      min-height: calc(100vh - 84px);

    }
  }
}
</style>
