<template>
  <el-scrollbar  :vertical="false"  wrap-class="scroll-wrapper" >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElScrollbar } from 'element-plus'
export default defineComponent({
  name: 'ScrollPane',
  components: {
    ElScrollbar
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
.scroll-wrapper {
  position: relative;
  width: 100%;
  white-space: nowrap;
}
</style>
