<template>
 <div>
   <div>Dashboard page</div>
   <ElInput v-model="model" />
   <ElButton size="small">111111</ElButton>
   <svg-icon icon-class="bug"></svg-icon>
   <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
   <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
   <h1>{{t('component.globalHeader.notification.empty')}}</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
   <h1>11111111</h1>
 </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage, ElInput, ElButton } from 'element-plus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'Dashboard',
  components: {
    ElInput,
    ElButton: ElButton
  },
  setup () {
    const { t, locale } = useI18n()
    const model = ref('')
    const sayHi = () => {
      ElMessage('message')
    }
    return { sayHi, model, t }
  }
})
</script>

<style lang="postcss" scoped></style>
