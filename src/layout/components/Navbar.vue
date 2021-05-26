<template>
  <div class="navbar">
    <Hambuger @toggleClick="updateSome" />
    {{some}}
    <Breadcrumb />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Hambuger from './Hambuger/index.vue'
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue'
import { appStore } from '@/store/modules/app'
export default defineComponent({
  name: 'Navbar',
  components: { Breadcrumb, Hambuger },
  setup () {
    const some = computed(() => appStore.someField)
    const updateSome = appStore.updateSome
    return {
      some,
      updateSome
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background: #fff;
}
</style>
