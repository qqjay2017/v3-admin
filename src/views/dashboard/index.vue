<template>
 <div>
   <div>Dashboard page</div>
   <svg-icon icon-class="bug"></svg-icon>
   <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
   <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
 </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'Dashboard',
  setup () {
    const sayHi = () => {
      ElMessage('message')
    }
    return { sayHi }
  }
})
</script>

<style lang="postcss" scoped></style>
