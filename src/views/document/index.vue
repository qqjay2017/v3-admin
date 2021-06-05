<template>
  <div>

    <ElButton @click="goPage">
      这是一个按钮
    </ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Document',
  components: {
    ElButton
  },
  setup () {
    const router = useRouter()
    const goPage = () => {
      router.push({
        path: '/guide/index',
        query: {
          a: 1
        }
      })
    }
    return {
      goPage
    }
  }
})
</script>

<style lang="postcss" scoped></style>
