import { onMounted, onBeforeMount, onUnmounted, watch } from 'vue'
import { getNamespace, Modules, useStore } from '@/store'
import { AppModuleMutations } from '@/store/modules/app'
import { useRoute } from 'vue-router'

const { body } = document
const WIDTH = 792 // refer to Bootstrap's responsive design

export default function useResize () {
  const store = useStore()
  const getIsMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = getIsMobile()
      store.commit(getNamespace(Modules.App, AppModuleMutations.toggleDevice), isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.commit(getNamespace(Modules.App, AppModuleMutations.closeSideBar), { withoutAnimation: true })
      }
    }
  }
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })

  onMounted(() => {
    const isMobile = getIsMobile()
    if (isMobile) {
      store.commit(getNamespace(Modules.App, AppModuleMutations.toggleDevice), 'mobile')
      store.commit(getNamespace(Modules.App, AppModuleMutations.setSize), 'mini')
      store.commit(getNamespace(Modules.App, AppModuleMutations.closeSideBar), { withoutAnimation: true })
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })
  const route = useRoute()
  // 移动端路由变化后关掉菜das单
  watch(() => route.fullPath, () => {
    if (store.state.app.device === 'mobile' && store.state.app.sidebar.opened) {
      store.commit(getNamespace(Modules.App, AppModuleMutations.closeSideBar), { withoutAnimation: false })
    }
  })
}
