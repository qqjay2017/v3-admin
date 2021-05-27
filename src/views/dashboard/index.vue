<template>
 <div>
   <div>Dashboard page</div>
   <ElInput v-model="model" />
   <ElButton>111111</ElButton>
   <svg-icon icon-class="bug"></svg-icon>
   <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
   <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
 </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage, ElInput, ElButton } from 'element-plus'
export default defineComponent({
  name: 'Dashboard',
  components: {
    ElInput,
    ElButton: ElButton
  },
  setup () {
    const model = ref('')
    const sayHi = () => {
      ElMessage('message')
    }
    return { sayHi, model }
  }
})
</script>

<style lang="postcss" scoped></style>
