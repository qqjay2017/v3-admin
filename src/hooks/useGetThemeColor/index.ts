import { computed } from 'vue'
import { useStore } from '@/store'

export default function useGetThemeColor () {
  return computed(() => useStore().state.settings.theme)
}
