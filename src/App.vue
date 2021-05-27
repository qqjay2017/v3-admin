<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useGenerateTheme from './hooks/useGenerateTheme'

export default defineComponent({
  name: 'App',
  setup () {
    useGenerateTheme()
  }
})
</script>
