<template>
  <div class="dianmo-wrap" ref="dianmoWrapRef">
    <SvgIcon icon-class="dianmo1" class-name="login-gitee-dianmo"
    :style="transformStyle"
    ></SvgIcon>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
export default defineComponent({
  name: 'DianMo',
  components: {
    SvgIcon
  },
  setup () {
    const isMove = ref(false)
    const dianmoWrapRef = ref()
    const speed = ref(10)
    const end = ref(0)
    const timer = ref()
    const transformStyle = computed(() => {
      return {
        transform: `translate( ${end.value}px )`,
        transition: `all ${speed.value}s ease`
      }
    })

    const run = () => {
      timer.value = setTimeout(() => {
        if (speed.value < 10000) {
          speed.value = speed.value * 2
        }

        run()
      }, end.value / 3)
    }

    const start = () => {
      const width = dianmoWrapRef.value.getBoundingClientRect().width
      speed.value = width / 120
      end.value = width

      run()
    }
    const stop = () => {
      clearTimeout(timer.value)
      speed.value = 1
    }
    return {
      isMove,
      dianmoWrapRef,
      start,
      transformStyle,
      stop
    }
  }

})
</script>

<style lang="scss">
.dianmo-wrap {
  width: 100%;
  overflow: hidden;
  .login-gitee-dianmo {
    width: 60px;
    height: 60px;

  }
}
</style>
