<template>
  <div>

    <ElButton >
      这是一个按钮
    </ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'Document',
  components: {
    ElButton
  },
  setup () {
    return {}
  }
})
</script>

<style lang="postcss" scoped></style>
