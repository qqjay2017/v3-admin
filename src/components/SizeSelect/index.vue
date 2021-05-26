<template>
  <div>
    <ElDropdown trigger="click" @command="handleSizeCommand">
      <div>
        <svg-icon class-name="size-icon" icon-class="size" />
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem v-for="item in sizeOptions" :key="item.value" :command="item.value" :disabled="item.value === size">
              {{item.label}}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script lang="ts">
import { Size } from '@/plugins/element'
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick
} from 'vue'
import { ElMessage, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { appStore } from '@/store/modules/app'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'SizeSelect',
  components: {
    ElDropdown: ElDropdown,
    ElDropdownMenu,
    ElDropdownItem

  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const sizeOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' }
    ]
    const size = computed(() => appStore.size)
    // 刷新当前路由
    const refreshView = () => {
      const { fullPath } = route
      nextTick(() => {
        // 重定向到中间页 实现vue中当前路由刷新
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }

    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const handleSizeCommand = (command:Size) => {
      (proxy as ComponentPublicInstance).$ELEMENT.size = command
      appStore.setSize(command)
      refreshView()
      ElMessage.success({
        type: 'success',
        message: 'Switch Size Success'
      })
    }
    return {
      sizeOptions,
      size,
      handleSizeCommand
    }
  }
})
</script>

<style lang="scss" scoped>
.size-icon {
  font-size: 18px;
}

</style>
