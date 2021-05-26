<template>
  <div class="navbar">
    <Hambuger @toggleClick="toggleSidebar" :is-active="opened" />
    <Breadcrumb />
    <div class="right-menu">
        <ScreenFull id="screefull" class="right-menu-item hover-effect" />
      <ElTooltip content="global size" effect="dark" placement="bottom">
        <SizeSelect class="right-menu-item hover-effect" />
      </ElTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import Hambuger from './Hambuger/index.vue'
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue'
import { appStore } from '@/store/modules/app'
import ScreenFull from '@/components/ScreenFull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
export default defineComponent({
  name: 'Navbar',
  components: { SizeSelect, ScreenFull, Breadcrumb, Hambuger, ElTooltip },
  setup () {
    const opened = computed(() => appStore.sidebar.opened)
    const toggleSidebar = appStore.toggleSidebar
    return {
      opened,
      toggleSidebar
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  background: #fff;
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025);
        }
      }
    }
  }
}
</style>
