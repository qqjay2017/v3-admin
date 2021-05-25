<template>
    <div class="app-main">
        <router-view v-slot={Component}>
            <transition name="fade-transition" mode="out-in">
                <keep-alive>
                    <component :is="Component" :key="key" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup () {
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })

    return {
      key
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* navbar 50px  */
  min-height: calc(100vh - 50px);
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all .5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
