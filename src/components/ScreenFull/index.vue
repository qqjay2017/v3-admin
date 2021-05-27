<template>
  <div class="fullscreen-wrap">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import screenfull, { Screenfull } from 'screenfull'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'ScreenFull',
  setup () {
    const isFullscreen = ref(false)
    const handleClick = () => {
      if (screenfull.isEnabled) { // 浏览器是否允许全屏模式
        screenfull.toggle()
        return
      }
      return ElMessage({
        message: 'you browser can not work',
        type: 'warning'
      })
    }

    const change = () => {
      // 更新当前全屏状态 根据状态切换对应图标
      isFullscreen.value = (screenfull as Screenfull).isFullscreen
    }

    const init = () => {
      if (screenfull.isEnabled) { // 浏览器是否允许全屏模式
        // 监听全屏切换状态
        screenfull.on('change', change)
      }
    }

    onMounted(() => {
      change()
    })

    return {
      isFullscreen,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.fullscreen-wrap {
  cursor: pointer;
}
</style>
