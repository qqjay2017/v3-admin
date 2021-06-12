<template>
  <div class="lang-select">
    <ElDropdown trigger="click" @command="handleLanguageCommand">
      <div class="icon-btn">
        <svg-icon class-name="size-icon" icon-class="language" />
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem v-for="item in languageOptions" :key="item.value" :command="item.value" :disabled="item.value === curLanguage">
              {{item.label}}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  inject
} from 'vue'
import { ElMessage, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

import { useRoute, useRouter } from 'vue-router'
import { getNamespace, Modules, useStore } from '@/store'
import { TagsViewModuleMutations } from '@/store/modules/tagsView'
import { AppModuleMutations } from '@/store/modules/app'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LangSelect',
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem

  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { t, locale } = useI18n()

    const curLanguage = computed(() => store.state.app.language)

    const languageOptions = [
      { label: 'cn 简体中文', value: 'zh-CN' },
      { label: 'us English', value: 'en-US' }
    ]

    // 刷新当前路由
    const refreshView:any = inject('refreshView')

    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const handleLanguageCommand = (command:string) => {
      locale.value = command
      store.commit(getNamespace(Modules.App, AppModuleMutations.setLanguage), command)
      store.commit(getNamespace(Modules.TagsView, TagsViewModuleMutations.DEL_ALL_CACHED_VIEWS))
      refreshView()
      ElMessage.success({
        type: 'success',
        message: 'Switch Language Success'
      })
    }
    return {
      languageOptions,
      handleLanguageCommand,
      curLanguage
    }
  }
})
</script>

<style lang="scss">
.lang-select {
  padding: 2px;
  border-radius: 4px;
  .icon-btn {
    text-align: center;
  }
  .size-icon {
    font-size: 14px;
  }
  &:hover {
    background-color: #fff;
    .size-icon {
      color: #000;
    }
  }
}

</style>
