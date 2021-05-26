<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
       <Navbar />
        <TagsView />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/layout/components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from '@/layout/components/Navbar.vue'
import TagsView from '@/layout/components/TagsView/index.vue'
export default defineComponent({
  name: 'Layout',
  components: { TagsView, Navbar, Sidebar, AppMain },
  setup () {
    return {}
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

    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      min-height: calc(100vh - 84px);

    }
  }
}
</style>
