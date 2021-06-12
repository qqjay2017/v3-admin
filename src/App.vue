<template>
    <router-view v-if="isView" />
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, provide } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    const isView = ref(true)
    const refreshView = () => {
      isView.value = false
      nextTick(() => {
        isView.value = true
      })
    }
    provide('refreshView', refreshView)

    return {
      isView
    }
  }

})
</script>
