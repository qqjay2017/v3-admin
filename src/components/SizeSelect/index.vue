<template>
  <div>
    <ElDropdown trigger="click" @command="handleSizeCommand">
      <div class="icon-btn">
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

import { useRoute, useRouter } from 'vue-router'
import { getNamespace, Modules, useStore } from '@/store'
import { TagsViewModuleMutations } from '@/store/modules/tagsView'
import { AppModuleMutations } from '@/store/modules/app'

export default defineComponent({
  name: 'SizeSelect',
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem

  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const sizeOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' }
    ]
    const size = computed(() => store.state.app.size)
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
      store.dispatch(getNamespace(Modules.TagsView, TagsViewModuleMutations.DEL_ALL_CACHED_VIEWS))
      store.dispatch(getNamespace(Modules.App, AppModuleMutations.setSize), command)
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
.icon-btn {
  width: 26px;
  height: 26px;
  text-align: center;
  padding-top: 8px;
}
.size-icon {
  font-size: 18px;
}

</style>
