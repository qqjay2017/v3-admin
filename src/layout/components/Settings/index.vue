<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <ThemePicker/>
    </div>

    <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch v-model="tagsView" class="drawer-switch"/>
    </div>
    <div class="drawer-item">
      <span>Show sidebar-logo</span>
      <el-switch v-model="showLogo" class="drawer-switch"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ThemePicker from '@/components/ThemePicker/index.vue'
import { getNamespace, Modules, useStore } from '@/store'
import { SettingsModuleMutations } from '@/store/modules/settings'
import { ElSwitch } from 'element-plus'

export default defineComponent({
  name: 'Settings',
  components: { ThemePicker, ElSwitch },
  setup () {
    const store = useStore()
    const tagsView = computed({
      get () {
        return store.state.settings.tagsView
      },
      set (val) {
        store.commit(getNamespace(Modules.Settings, SettingsModuleMutations.CHANGE_SETTING), {
          key: 'tagsView',
          value: val
        })
      }
    })

    const showLogo = computed({
      get () {
        return store.state.settings.sidebarLogo
      },
      set (val) {
        store.commit(getNamespace(Modules.Settings, SettingsModuleMutations.CHANGE_SETTING), {
          key: 'sidebarLogo',
          value: val
        })
      }
    })
    return {
      tagsView,
      showLogo
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 16px;
    color: rgba(0, 0, 0, .65);
  }
}
</style>
